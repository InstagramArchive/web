import { fail, redirect } from '@sveltejs/kit'

export const load = async ({ locals: { supabase, getSession } }) => {
  const session = await getSession()

  if (!session) {
    throw redirect(303, '/')
  }

  const { data: profile } = await supabase
    .from('instagram_profile')
    .select(`id, name`)
    .eq('sponsor', session.user.id)

  return { session, profile }
}

export const actions = {
  update: async ({ request, locals: { supabase, getSession } }) => {
    const session = await getSession();

    if (!session) {
      throw redirect(303, '/');
    }

    const formData = await request.formData();
    const usernames = formData.getAll('username');
    const ids = formData.getAll('id');

    console.log(ids, usernames)

    
    let { data, error : error1 } = await supabase
    .rpc('update_sponsorship', {
      profile_number_to_replace : ids[0], 
      target_profile_name : usernames[0]
    })

    if (error1) {

    console.error('Error calling the function:', error1, usernames[0]);
    }else{
      console.log("data:",usernames[0], data )
    }


    let { data: data2, error: error2 }  = await supabase
    .rpc('update_sponsorship', {
      profile_number_to_replace : ids[1], 
      target_profile_name : usernames[1]
    })

    if (error2) {
      console.error('Error calling the function:', error2, usernames[1]);
    }else{
      console.log("data:",usernames[1], data2 )
    }

    if (error1 || error2) {
      // Handle the error, e.g., by logging it or returning an error response
      return {
        status: 500,
        body: 'Internal Server Error',
      };
    
    }

    // Optionally, you can do something with the result
    console.log('Function result:', data);

    return {
      status: 200,
      body: 'Form submitted successfully',
    };
  },
 
}
