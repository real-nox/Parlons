import { supabase } from "@/lib/supabase";

export async function updateProfileState(user_id: string, state: number) {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .update({ state })
      .eq("id", user_id)
      .select()
      .single();

    if (error) {
      console.error("Update profile state error:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, profile: data };
  } catch (err: any) {
    console.error(err);
    return { success: false, error: err.message };
  }
}

export async function updateProfilNiveau(user_id: string, niveau: string) {
  try {
    const { data, error } = await supabase
      .from("profiles")
      .update({ niveau })
      .eq("id", user_id)
      .select()
      .single();

    if (error) {
      console.error("Update profile niveau error:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, profile: data };
  } catch (err: any) {
    console.error(err);
    return { success: false, error: err.message };
  }
}
