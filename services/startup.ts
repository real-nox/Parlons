import { supabase } from "@/lib/supabase";

export async function setProfileThemes(
  themes: string[],
  categories: string[],
  user_id: string,
) {
  try {
    const { error } = await supabase
      .from("themes")
      .upsert({ idUser: user_id, themes, categories });

    if (error) {
      console.error("Set themes error:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error(err);
    return { success: false, error: err.message };
  }
}