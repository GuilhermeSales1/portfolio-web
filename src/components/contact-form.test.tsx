import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ContactForm } from "./contact-form";
import { sendMessage } from "@/services/messages";

vi.mock("@/services/messages", () => ({
  sendMessage: vi.fn(),
}));

const fillValidForm = () => {
  fireEvent.change(screen.getByLabelText("Nome"), {
    target: { value: "Guilherme" },
  });

  fireEvent.change(screen.getByLabelText("E-mail"), {
    target: { value: "teste@email.com" },
  });

  fireEvent.change(screen.getByLabelText("Mensagem"), {
    target: { value: "Esta é uma mensagem de teste." },
  });
};

const submitForm = () => {
  const button = screen.getByRole("button", {
    name: "Enviar mensagem",
  });

  fireEvent.submit(button.closest("form")!);
};

describe("ContactForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve validar o nome", () => {
    render(<ContactForm />);
    fillValidForm();

    fireEvent.change(screen.getByLabelText("Nome"), {
      target: { value: "A" },
    });

    submitForm();

    expect(
      screen.getByText("Informe um nome com pelo menos 2 caracteres."),
    ).toBeInTheDocument();

    expect(sendMessage).not.toHaveBeenCalled();
  });

  it("deve validar o e-mail", () => {
    render(<ContactForm />);
    fillValidForm();

    fireEvent.change(screen.getByLabelText("E-mail"), {
      target: { value: "email-invalido" },
    });

    submitForm();

    expect(screen.getByText("Informe um e-mail válido.")).toBeInTheDocument();

    expect(sendMessage).not.toHaveBeenCalled();
  });

  it("deve validar o tamanho da mensagem", () => {
    render(<ContactForm />);
    fillValidForm();

    fireEvent.change(screen.getByLabelText("Mensagem"), {
      target: { value: "Curta" },
    });

    submitForm();

    expect(
      screen.getByText("A mensagem precisa ter pelo menos 10 caracteres."),
    ).toBeInTheDocument();

    expect(sendMessage).not.toHaveBeenCalled();
  });

  it("deve enviar uma mensagem válida", async () => {
    render(<ContactForm />);

    vi.mocked(sendMessage).mockResolvedValue({ success: true });

    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true }));

    fillValidForm();
    submitForm();

    await waitFor(() => {
      expect(
        screen.getByText("Mensagem enviada com sucesso!"),
      ).toBeInTheDocument();
    });

    expect(sendMessage).toHaveBeenCalledWith({
      name: "Guilherme",
      email: "teste@email.com",
      message: "Esta é uma mensagem de teste.",
    });
  });
});
