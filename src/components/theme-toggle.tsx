"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

export const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700"
      aria-label={`Ativar tema ${isDark ? "claro" : "escuro"}`}
    >
      {isDark ? "☀️ Claro" : "🌙 Escuro"}
    </button>
  );
};
