import { createClient } from "@/lib/supabase/client";

type NewMessage = {
  name: string;
  email: string;
  message: string;
};

export const sendMessage = async (data: NewMessage) => {
  const supabase = createClient();

  const { error } = await supabase.from("messages").insert(data);

  if (error) {
    return { success: false };
  }

  return { success: true };
};
