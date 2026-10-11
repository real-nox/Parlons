import { supabase } from "@/lib/supabase";
import { FunctionsHttpError } from "@supabase/supabase-js";

export type Subject = {
  title: string;
  type: string;
  desc: string;
  detail: string;
};

export async function getProfileThemes(user_id: string) {
  try {
    const { data, error } = await supabase
      .from("themes")
      .select("themes")
      .eq("idUser", user_id)
      .single();

    if (error) return { success: false as const, error: error.message };
    return { success: true as const, themes: (data.themes ?? []) as string[] };
  } catch (err: any) {
    return { success: false as const, error: err.message };
  }
}

export async function generateSubjects(params: {
  themes: string[];
  niveau: string;
  motsMin: number;
  motsMax: number;
  exclude?: string[];
  count?: number;
}) {
  try {
    const { data, error } = await supabase.functions.invoke(
      "smart-service",
      { body: params },
    );

    if (error) {
      let message = error.message;
      if (error instanceof FunctionsHttpError) {
        const body = await error.context.json().catch(() => null);
        message = body?.error ?? body?.message ?? message;
        console.log("Edge function status:", error.context.status, body);
      }
      return { success: false as const, error: message };
    }

    return { success: true as const, subjects: data.sujets as Subject[] };
  } catch (err: any) {
    console.error(err);
    return { success: false as const, error: err.message };
  }
}
