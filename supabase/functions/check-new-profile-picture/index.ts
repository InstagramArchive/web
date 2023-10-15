// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { createHash } from 'https://deno.land/std@0.110.0/node/crypto.ts';
import { randomUUID } from 'https://deno.land/std@0.110.0/node/crypto.ts';

console.log('Hello from Functions!');

Deno.serve(async (req) => {
	try {
		// Create a Supabase client with the Auth context of the logged in user.
		const supabaseClient = createClient(
			// Supabase API URL - env var exported by default.
			Deno.env.get('SUPABASE_URL') ?? '',
			// Supabase API ANON KEY - env var exported by default.
			Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
			// Create client with Auth context of the user that called the function.
			// This way your row-level-security (RLS) policies are applied.
			{ global: { headers: { Authorization: req.headers.get('Authorization')! } } }
		);
		//[ { name: "carla.tstr" }, { name: "elisepgn" } ]
		const userList = await getInstagramProfileName(supabaseClient);

		for (const user of userList) {
			const userData = await getUserData(user.name);
			console.log(userData);
			const pic = await getFile(userData.result.profile.profile_img);

			const checksum = getFileChecksum(pic);
			if (checksum !== user.checksum) {
        console.log("new data fro", user.name)
				const fileName = randomUUID() + '.png';

				uploadProfilePicture(supabaseClient, new Uint8Array(pic), fileName);

				const picHD = await getFile(userData.result.profile.profile_full_HD)
				const fileNameHD = randomUUID() + '.png';
				uploadProfilePicture(supabaseClient, new Uint8Array(picHD), fileNameHD);

				// Example usage
				const profilePictureData = {
					profile_id: user.id,
					path: fileName,
					hd_path: fileNameHD,
					checksum
				};
				console.log(profilePictureData);
				console.log(await addProfilePicture(supabaseClient, profilePictureData));
			}else{
        console.log("no new data fro", user.name)

      }
		}

		/*
   
      */
		return new Response(JSON.stringify({ message: 'Succes' }), {
			headers: { 'Content-Type': 'application/json' },
			status: 200
		});
		return new Response(JSON.stringify({ data }), {
			headers: { 'Content-Type': 'application/json' },
			status: 200
		});
	} catch (error) {
		return new Response(JSON.stringify({ error: error.message }), {
			headers: { 'Content-Type': 'application/json' },
			status: 400
		});
	}
});

async function getUserData(username: string) {
	const options = {
		method: 'POST',
		headers: {
			'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/116.0',
			Accept: 'text/html, */*; q=0.01',
			'Accept-Language': 'en-US,en;q=0.5',
			'Accept-Encoding': 'gzip, deflate, br',
			Referer: 'https://www.save-free.com/fr/profile-downloader/',
			'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
			'X-Valy-Cache': 'accpted',
			'X-Requested-With': 'XMLHttpRequest',
			Origin: 'https://www.save-free.com',
			'Alt-Used': 'www.save-free.com',
			Connection: 'keep-alive',
			Cookie:
				'cookielawinfo-checkbox-necessary=yes; cookielawinfo-checkbox-functional=no; cookielawinfo-checkbox-performance=no; cookielawinfo-checkbox-analytics=no; cookielawinfo-checkbox-others=no; HstCfa4752989=1692620673149; HstCla4752989=1692807798982; HstCmu4752989=1692620673149; HstPn4752989=2; HstPt4752989=8; HstCnv4752989=4; HstCns4752989=4; c_ref_4752989=https%3A%2F%2Fwww.google.com%2F; _ga_9M9G1NYVWE=GS1.1.1692807555.4.1.1692807799.45.0.0; _ga=GA1.2.504857239.1692620674; cf_clearance=v6b0jtvBh0oQSilulYma7WbHEcuxASFvS0Asz_iR9II-1692807784-0-1-27900a69.2f4786fd.7c6c3dc-0.2.1692807784; _ga_TCKL78VSRE=GS1.1.1692807555.4.1.1692807799.45.0.0; _gcl_au=1.1.679214426.1692620674; _gid=GA1.2.1052748127.1692778035; _gat_gtag_UA_46666019_17=1; _gat_UA-46666019-17=1',
			'Sec-Fetch-Dest': 'empty',
			'Sec-Fetch-Mode': 'cors',
			'Sec-Fetch-Site': 'same-origin',
			Pragma: 'no-cache',
			'Cache-Control': 'no-cache',
			TE: 'trailers'
		},
		body: new URLSearchParams({ instagram_url: username, type: 'profile', resource: 'save' })
	};
	const raw = await fetch('https://www.save-free.com/process', options);
	const data = await raw.json();
	return data;
}

function getFileChecksum(fileData: any): string {
	// Calculate the checksum of the file
	const hash = createHash('sha256');
	hash.update(new Uint8Array(fileData));
	const hashBuffer = hash.digest();
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const checksum = hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');

	return checksum;
}

async function getFile(url: string) {
	const response = await fetch(url);
	return await response.arrayBuffer();
}

async function uploadProfilePicture(supabaseClient: any, fileData: any, fileName: string) {
	const { data, error } = await supabaseClient.storage
		.from('profile_picture') // Replace with your bucket name
		.upload(fileName, new Uint8Array(fileData));

	if (error) {
		throw error;
	}

	// Check if the file was successfully uploaded
	if (!data) {
		throw new Error('Failed to upload the file');
	}
}

async function getInstagramProfileName(supabaseClient: any) {
	const { data, error } = await supabaseClient
		.from('last_profile_picture_checksum') // Use the view name here
		.select('id, name, checksum')

	if (error) throw error;
	return data;
}

async function addProfilePicture(supabaseClient: any, data: any) {
	try {
		const { data: insertedData, error } = await supabaseClient
			.from('data_profile_picture')
			.insert([data])
			.select();

		if (error) {
			throw error;
		}

		return insertedData;
	} catch (error) {
		throw error;
	}
}


// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
