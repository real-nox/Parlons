import { supabase } from "@/lib/supabase";

export async function saveEssay(
  author_id: string,
  essay: {
    id?: string;
    theme: string;
    level: string;
    subject: object;
    content: string;
    status?: "draft" | "submitted";
    word_count: string;
  },
) {
  try {
    const { data, error } = await supabase
      .from("essays")
      .upsert({
        ...essay,
        author_id,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      console.error("Save essay error:", error.message);
      return { success: false, error: error.message };
    }

    return { success: true, essay: data };
  } catch (err: any) {
    console.error(err);
    return { success: false, error: err.message };
  }
}

export async function getEssays(author_id: string, limit?: number) {
  try {
    let query = supabase
      .from("essays")
      .select("id, theme, level, word_count, status, created_at")
      .eq("author_id", author_id)
      .order("created_at", { ascending: false });

    if (limit) query = query.limit(limit);

    const { data, error } = await query;

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, essays: data };
  } catch (err: any) {
    console.error(err);
    return { success: false, error: err.message };
  }
}

export async function getEssay(id: string) {
  try {
    const { data, error } = await supabase
      .from("essays")
      .select("*")
      .eq("id", id)
      .single();

    if (error) return { success: false as const, error: error.message };
    return { success: true as const, essay: data };
  } catch (err: any) {
    return { success: false as const, error: err.message };
  }
}
