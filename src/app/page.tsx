import { Suspense } from "react";
import { getGithubRepos } from "@/services/github";
import { createClient } from "@/lib/supabase/server";
import { ContactForm } from "@/components/contact-form";
import { ThemeToggle } from "@/components/theme-toggle";

const technologies = [
  "JavaScript",
  "TypeScript",
  "React",
  "Next.js",
  "Node.js",
  "Java",
  "Python",
  "SQL",
];

async function GithubProjects() {
  const supabase = await createClient();

  const [result, featuredResult] = await Promise.all([
    getGithubRepos(),
    supabase.from("featured_projects").select("project_name"),
  ]);

  if (result.status === "error") {
    return (
      <p className="mt-4 text-red-500 dark:text-red-400">
        Não foi possível carregar os projetos do GitHub.
      </p>
    );
  }

  if (featuredResult.error) {
    return (
      <p className="mt-4 text-red-500 dark:text-red-400">
        Não foi possível carregar os projetos em destaque.
      </p>
    );
  }

  const featuredNames = new Set(
    (featuredResult.data ?? []).map((project) => project.project_name),
  );

  const repos = result.repos.filter((repo) => featuredNames.has(repo.name));

  if (repos.length === 0) {
    return (
      <p className="mt-4 text-zinc-600 dark:text-zinc-400">
        Nenhum projeto em destaque no momento.
      </p>
    );
  }

  return (
    <div className="mt-8 grid gap-4 md:grid-cols-2">
      {repos.map((repo) => (
        <a
          key={repo.id}
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="rounded-xl border border-zinc-200 bg-zinc-50 p-6 transition hover:border-violet-500 dark:border-zinc-800 dark:bg-zinc-900"
        >
          <h3 className="text-xl font-semibold">{repo.name}</h3>

          <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">
            {repo.description || "Sem descrição disponível."}
          </p>

          <div className="mt-6 flex gap-4 text-sm text-zinc-500 dark:text-zinc-500">
            <span>{repo.language || "Não informado"}</span>
            <span>★ {repo.stargazers_count}</span>
          </div>
        </a>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 transition-colors dark:bg-[#0b0b0f] dark:text-white">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-8">
        <span className="text-xl font-bold">GS.</span>

        <div className="flex items-center gap-6 text-sm text-zinc-600 dark:text-zinc-400">
          <a
            href="#sobre"
            className="hover:text-zinc-900 dark:hover:text-white"
          >
            Sobre
          </a>
          <a
            href="#tecnologias"
            className="hover:text-zinc-900 dark:hover:text-white"
          >
            Tecnologias
          </a>
          <a
            href="#projetos"
            className="hover:text-zinc-900 dark:hover:text-white"
          >
            Projetos
          </a>
          <a
            href="#contato"
            className="hover:text-zinc-900 dark:hover:text-white"
          >
            Contato
          </a>

          <ThemeToggle />
        </div>
      </nav>

      <section className="mx-auto flex min-h-[75vh] max-w-5xl flex-col justify-center px-6">
        <p className="mb-4 text-sm text-violet-500 dark:text-violet-400">
          DESENVOLVEDOR EM FORMAÇÃO
        </p>

        <h1 className="max-w-3xl text-5xl leading-tight font-bold md:text-7xl">
          Olá, eu sou{" "}
          <span className="text-violet-500 dark:text-violet-400">
            Guilherme.
          </span>
          <br />
          Construo soluções com código.
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          Estudante de Engenharia de Software, interessado em desenvolvimento
          full-stack e na criação de aplicações úteis e bem estruturadas.
        </p>

        <div className="mt-8 flex gap-4">
          <a
            href="#projetos"
            className="rounded-lg bg-violet-500 px-6 py-3 font-medium text-white hover:bg-violet-600"
          >
            Ver projetos
          </a>

          <a
            href="https://github.com/GuilhermeSales1"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-zinc-300 px-6 py-3 hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-900"
          >
            GitHub
          </a>
        </div>
      </section>

      <section id="sobre" className="mx-auto max-w-5xl scroll-mt-10 px-6 py-20">
        <h2 className="text-3xl font-bold">Sobre mim</h2>
        <p className="mt-6 max-w-2xl leading-relaxed text-zinc-600 dark:text-zinc-400">
          Estou desenvolvendo minhas habilidades em programação por meio de
          projetos práticos, explorando tanto o front-end quanto o back-end. Meu
          objetivo é transformar conhecimento em aplicações reais.
        </p>
      </section>

      <section
        id="tecnologias"
        className="mx-auto max-w-5xl scroll-mt-10 px-6 py-20"
      >
        <h2 className="text-3xl font-bold">Tecnologias</h2>

        <div className="mt-8 flex flex-wrap gap-3">
          {technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-lg border border-zinc-200 bg-zinc-100 px-4 py-3 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
            >
              {technology}
            </span>
          ))}
        </div>
      </section>

      <section
        id="projetos"
        className="mx-auto max-w-5xl scroll-mt-10 px-6 py-20"
      >
        <h2 className="text-3xl font-bold">Projetos</h2>

        <Suspense
          fallback={
            <p className="mt-4 text-zinc-600 dark:text-zinc-400">
              Carregando projetos...
            </p>
          }
        >
          <GithubProjects />
        </Suspense>
      </section>

      <ContactForm />

      <footer className="border-t border-zinc-200 px-6 py-8 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-500">
        © 2026 Guilherme. Desenvolvido...
      </footer>
    </main>
  );
}
