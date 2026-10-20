import { supabase, supabaseSignup } from "../lib/supabase";

export async function signUp(
  email: string,
  password: string,
  username: string,
) {
  try {
    const { error } = await supabaseSignup.auth.signUp({
      email,
      password,
      options: { data: { username } },
    });

    if (error) {
      console.error("Sign up error:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error(err);
    return { success: false, error: err.message };
  }
}

export async function signIn(email: string, password: string) {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error("Sign in error:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error(err);
    return { success: false, error: err.message };
  }
}

export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error("Sign out error:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error(err);
    return { success: false, error: err.message };
  }
}

export async function getEmail(userId: string) {
  try {
    const { data, error } = await supabase.rpc("get_user_email_by_id", {
      p_user_id: userId,
    });

    if (error) return { success: false, error };
    return { success: true, email: data };
  } catch (err: any) {
    console.error(err);
    return { success: false, error: err.message };
  }
}
