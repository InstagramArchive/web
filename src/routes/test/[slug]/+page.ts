import { supabase } from "$lib/supabaseClient";
import type { PageLoad } from "./$types";

export const load: PageLoad = ({ params }) => {
	return { values:loadData(params.slug)}
};

	async function loadData(id: string): Promise<any[]> {
		const { data } = await supabase.from('data_profile_picture').select('*').eq('id', id).order('created_at', { ascending: false });
		return data ?? [];
	}