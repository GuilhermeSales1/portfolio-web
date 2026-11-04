import { describe, expect, it } from "vitest";
import { isAdmin } from "./is-admin";

describe("isAdmin", () => {
  it("deve permitir o administrador correto", () => {
    expect(isAdmin("admin-123", "admin-123")).toBe(true);
  });

  it("deve negar usuários diferentes do administrador", () => {
    expect(isAdmin("user-456", "admin-123")).toBe(false);
  });

  it("deve negar usuários não autenticados", () => {
    expect(isAdmin(null, "admin-123")).toBe(false);
  });
});
