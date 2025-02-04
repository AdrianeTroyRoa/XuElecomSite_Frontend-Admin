import { createClient } from "@supabase/supabase-js";
import { useSupabaseClient } from "@nuxtjs/supabase";

export default defineEventHandler(async () => {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_KEY;

  const supabase = useSupabaseClient();
  const serviceSupabase = createClient(supabaseUrl, supabaseKey);

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASS;

  // Check if admin exists
  const { data: admin, error: fetchError } = await serviceSupabase
    .from("profiles")
    .select("id")
    .eq("email", email)
    .single();

  if (admin) return { message: "Admin already exists" };

  // Register admin
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) return { error: error.message };

  // Assign role in `profiles` table
  await serviceSupabase
    .from("profiles")
    .insert([{ id: data.user.id, email, role: "admin" }]);

  return { message: "Admin registered successfully" };
});
