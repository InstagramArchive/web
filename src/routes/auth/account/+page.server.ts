import type { SupabaseClient } from '@supabase/supabase-js';
import { redirect } from '@sveltejs/kit';


export const load = async ({ locals: { supabase, getSession } }) => {
  const session = await getSession();

  if (!session) {
    throw redirect(303, '/');
  }

  const { data: profile } = await supabase
    .from('instagram_profile')
    .select(`id, name`)
    .eq('sponsor', session.user.id);

  return { session, profile };
};

export const actions = {

  remove: async ({ request, locals: { supabase, getSession } }) => {
    const session = await getSession();

    if (!session) {
      throw redirect(303, '/');
    }

    const formData = await request.formData();
    const id = formData.get('id'); //profile id

    console.log("id:", id, "user:", session.user.id);

    const { data: update, error: updateError } = await supabase
        .from('instagram_profile')
        .update({ sponsor: null })
        .eq('id', id)
        .eq('sponsor', session.user.id);

    console.log("update:", update, "error:", updateError);

    if (updateError) {
        return {
            status: 500,
            body: { error: updateError }
        };
    }

    return await getUpdatedProfiles(session.user.id, supabase);
  },

  add: async ({ request, locals: { supabase, getSession } }) => {
    const session = await getSession();

    if (!session) {
      throw redirect(303, '/');
    }

    const formData = await request.formData();
    const username: string | null = formData.get('username') as string;

    console.log("username:", username);

    if (!username) {
      return {
        status: 400,
        body: { error: 'Username is required' },
      };
    }

    await processAdd(username, supabase);

    return await getUpdatedProfiles(session.user.id, supabase);
  },
};

const processAdd = async (username: string, supabase: SupabaseClient<any, "public", any>) => {
  try {
    const { data, error } = await supabase.rpc('add_sponsorship', {
      target_profile_name: username
    });

    console.log("add data:", data, "error:", error);

    if (error) {
      console.error('Error calling the function:', error, username);
      return { error };
    } else {
      console.log("data:", username, data);
      return { data };
    }
  } catch (error) {
    console.error('Error calling the function:', error, username);
    return { status: 500, body: error };
  }
};

const getUpdatedProfiles = async (userId: string, supabase: SupabaseClient<any, "public", any>) => {
  const { data: updatedProfiles, error: profileError } = await supabase
    .from('instagram_profile')
    .select(`id, name`)
    .eq('sponsor', userId);

  if (profileError) {
    return {
      status: 500,
      body: { error: profileError },
    };
  }

  return {
    status: 200,
    body: { data: updatedProfiles },
  };
};
