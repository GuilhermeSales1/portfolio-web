"use client";

import { sendMessage } from "@/services/messages";
import { useState } from "react";

type FormErrors = {
  name?: string;
  email?: string;
  message?: string;
};

export const ContactForm = () => {
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name")).trim();
    const email = String(formData.get("email")).trim();
    const message = String(formData.get("message")).trim();

    const newErrors: FormErrors = {};

    if (name.length < 2) {
      newErrors.name = "Informe um nome com pelo menos 2 caracteres.";
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Informe um e-mail válido.";
    }

    if (message.length < 10) {
      newErrors.message = "A mensagem precisa ter pelo menos 10 caracteres.";
    }

    setErrors(newErrors);
    setStatus("");

    if (Object.keys(newErrors).length > 0) return;

    setStatus("Enviando...");

    try {
      const result = await sendMessage({ name, email, message });

      if (!result.success) {
        setStatus("Não foi possível salvar a mensagem. Tente novamente.");
        return;
      }

      const response = await fetch("/api/contact-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        setStatus("Mensagem salva, mas não foi possível enviar o e-mail.");
        form.reset();
        return;
      }

      setStatus("Mensagem enviada com sucesso!");
      form.reset();
    } catch {
      setStatus("Ocorreu um erro. Tente novamente.");
    }
  };

  const inputClass =
    "w-full rounded-lg border border-zinc-300 bg-white p-3 text-zinc-900 outline-none transition-colors focus:border-violet-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white";

  const labelClass = "mb-2 block font-medium text-zinc-800 dark:text-zinc-200";

  return (
    <form onSubmit={handleSubmit} className="m-8 flex flex-col gap-5">
      <div>
        <label htmlFor="name" className={labelClass}>
          Nome
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className={inputClass}
          minLength={2}
          required
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className={inputClass}
          required
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Mensagem
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className={inputClass}
          minLength={10}
          required
        />
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="rounded-lg bg-violet-600 px-6 py-3 font-medium text-white transition-colors hover:bg-violet-700"
      >
        Enviar mensagem
      </button>

      {status && (
        <p className="text-sm text-zinc-700 dark:text-zinc-300" role="status">
          {status}
        </p>
      )}
    </form>
  );
};
