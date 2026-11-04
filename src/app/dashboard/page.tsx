import { isAdmin } from "@/lib/is-admin";
import { createClient } from "@/lib/supabase/server";
import { getGithubRepos } from "@/services/github";
import { redirect } from "next/navigation";
import { updateMessage, toggleFeaturedProject } from "./actions";
import { LogoutButton } from "./logout-button";

export const instant = false;

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!isAdmin(user?.id, process.env.SUPABASE_ADMIN_USER_ID)) {
    redirect("/login");
  }

  const [messagesResult, githubResult, featuredResult] = await Promise.all([
    supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false }),
    getGithubRepos(),
    supabase.from("featured_projects").select("project_name"),
  ]);

  if (messagesResult.error) {
    return <p>Erro ao carregar mensagens.</p>;
  }

  const messages = messagesResult.data;
  const featuredProjects = featuredResult.data ?? [];

  return (
    <main className="min-h-screen bg-[#0b0b0f] px-6 py-16 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <LogoutButton />
        </div>

        <p className="mt-3 text-zinc-400">
          Gerencie as mensagens e os projetos do seu portfólio.
        </p>

        <section className="mt-16">
          <h2 className="text-2xl font-bold">Projetos em destaque</h2>

          <p className="mt-2 text-zinc-400">
            Escolha quais projetos aparecem no seu portfólio.
          </p>

          {githubResult.status === "error" ? (
            <p className="mt-5 text-red-400">
              Não foi possível carregar os projetos do GitHub.
            </p>
          ) : githubResult.repos.length === 0 ? (
            <p className="mt-5 text-zinc-400">Nenhum projeto encontrado.</p>
          ) : (
            <div className="mt-6 flex flex-col gap-4">
              {githubResult.repos.map((repo) => {
                const isFeatured = featuredProjects.some(
                  (project) => project.project_name === repo.name,
                );

                return (
                  <article
                    key={repo.id}
                    className="flex items-center justify-between gap-4 rounded-xl border border-zinc-800 bg-zinc-900 p-5"
                  >
                    <div>
                      <h3 className="font-semibold">{repo.name}</h3>
                      <p className="mt-1 text-sm text-zinc-400">
                        {repo.description || "Sem descrição"}
                      </p>
                    </div>

                    <form action={toggleFeaturedProject}>
                      <input
                        type="hidden"
                        name="projectName"
                        value={repo.name}
                      />

                      <input
                        type="hidden"
                        name="isFeatured"
                        value={String(isFeatured)}
                      />

                      <button
                        type="submit"
                        className="rounded-lg bg-violet-500 px-4 py-2 text-sm font-medium hover:bg-violet-600"
                      >
                        {isFeatured ? "Remover destaque" : "Destacar"}
                      </button>
                    </form>
                  </article>
                );
              })}
            </div>
          )}
        </section>

        <section className="mt-16">
          <h2 className="text-2xl font-bold">Mensagens recebidas</h2>

          <div className="mt-6 flex flex-col gap-5">
            {messages.length === 0 && (
              <p className="text-zinc-400">Nenhuma mensagem recebida.</p>
            )}

            {messages.map((message) => (
              <article
                key={message.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-6"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold">{message.name}</h3>

                  <span
                    className={
                      message.responded ? "text-green-400" : "text-yellow-400"
                    }
                  >
                    {message.responded ? "Respondida" : "Pendente"}
                  </span>
                </div>

                <p className="mt-2 text-sm text-violet-400">{message.email}</p>

                <p className="mt-5 whitespace-pre-wrap text-zinc-300">
                  {message.message}
                </p>

                <p className="mt-5 text-xs text-zinc-500">
                  {new Date(message.created_at).toLocaleString("pt-BR")}
                </p>

                <form action={updateMessage} className="mt-5">
                  <input type="hidden" name="id" value={message.id} />

                  <input
                    type="hidden"
                    name="responded"
                    value={String(!message.responded)}
                  />

                  <button
                    type="submit"
                    className="rounded-lg bg-violet-500 px-4 py-2 text-sm font-medium hover:bg-violet-600"
                  >
                    {message.responded
                      ? "Marcar como pendente"
                      : "Marcar como respondida"}
                  </button>
                </form>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
