"use server";

import { isAdmin } from "@/lib/is-admin";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const updateMessage = async (formData: FormData) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!isAdmin(user?.id, process.env.SUPABASE_ADMIN_USER_ID)) {
    redirect("/login");
  }

  const id = String(formData.get("id"));
  const responded = formData.get("responded") === "true";

  const { error } = await supabase
    .from("messages")
    .update({ responded })
    .eq("id", id);

  if (error) {
    throw new Error("Não foi possível atualizar a mensagem.");
  }

  revalidatePath("/dashboard");
};
export const toggleFeaturedProject = async (formData: FormData) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!isAdmin(user?.id, process.env.SUPABASE_ADMIN_USER_ID)) {
    redirect("/login");
  }

  const projectName = String(formData.get("projectName"));
  const isFeatured = formData.get("isFeatured") === "true";

  if (!projectName) return;

  if (isFeatured) {
    const { error } = await supabase
      .from("featured_projects")
      .delete()
      .eq("project_name", projectName);

    if (error) throw new Error("Erro ao remover projeto.");
  } else {
    const { error } = await supabase
      .from("featured_projects")
      .insert({ project_name: projectName });

    if (error) throw new Error("Erro ao destacar projeto.");
  }

  revalidatePath("/dashboard");
  revalidatePath("/");
};
