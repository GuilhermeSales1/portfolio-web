import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Preencha todos os campos." },
        { status: 400 },
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: "Portfólio <onboarding@resend.dev>",
      to: [process.env.CONTACT_EMAIL!],
      replyTo: email,
      subject: `Nova mensagem de ${name}`,
      text: `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`,
    });

    if (error) {
      return NextResponse.json(
        { error: "Não foi possível enviar o e-mail." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erro interno ao enviar o e-mail." },
      { status: 500 },
    );
  }
}
