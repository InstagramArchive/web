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
  update: async ({ request, locals: { supabase, getSession } }) => {
    const session = await getSession();

    if (!session) {
      throw redirect(303, '/');
    }

    const formData = await request.formData();
    const usernames = formData.getAll('username');
    const ids = formData.getAll('id');

    const processUpdate = async (id: number, username: string) => {
      try {
        const { data, error } = await supabase.rpc('update_sponsorship', {
          profile_number_to_replace: id,
          target_profile_name: username
        });

        if (error) {
          console.error('Error calling the function:', error, username);
          return { error };
        } else {
          console.log("data:", username, data);
          return { data };
        }
      } catch (error) {
        console.error('Error calling the function:', error, username);
        return { error };
      }
    };

    const [result1, result2] = await Promise.all([
      processUpdate(ids[0], usernames[0]),
      processUpdate(ids[1], usernames[1])
    ]);

    const { data: updatedProfiles, error: profileError } = await supabase
      .from('instagram_profile')
      .select(`id, name`)
      .eq('sponsor', session.user.id);

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
  },
};
