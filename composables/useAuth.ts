export function useAuth() {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) throw new Error(error.message);
  };

  const logout = async () => {
    await supabase.auth.signOut();
  };

  return { user, login, logout };
}
