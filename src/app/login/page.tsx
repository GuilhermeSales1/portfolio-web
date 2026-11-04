"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError("E-mail ou senha incorretos.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0b0b0f] px-6 text-white">
      <form
        onSubmit={handleLogin}
        className="flex w-full max-w-md flex-col gap-5 rounded-2xl border border-zinc-800 bg-zinc-900 p-8"
      >
        <h1 className="text-3xl font-bold">Área administrativa</h1>

        <div>
          <label htmlFor="email">E-mail</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
          />
        </div>

        <div>
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="mt-2 w-full rounded-lg border border-zinc-700 bg-zinc-800 p-3"
          />
        </div>

        {error && <p className="text-red-400">{error}</p>}

        <button
          type="submit"
          className="rounded-lg bg-violet-500 p-3 font-medium hover:bg-violet-600"
        >
          Entrar
        </button>
      </form>
    </main>
  );
}
