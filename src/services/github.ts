import type { GithubRepo } from "@/types/github";

type GithubResult =
  { status: "success"; repos: GithubRepo[] } | { status: "error" };

export const getGithubRepos = async (): Promise<GithubResult> => {
  try {
    const response = await fetch(
      "https://api.github.com/users/GuilhermeSales1/repos?sort=updated&per_page=100",
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
        next: {
          revalidate: 3600,
        },
      },
    );

    if (!response.ok) {
      return { status: "error" };
    }

    const data: GithubRepo[] = await response.json();

    const repos = data.filter((repo) => !repo.fork).slice(0, 6);

    return { status: "success", repos };
  } catch {
    return { status: "error" };
  }
};

export const getGithubRepo = async (name: string) => {
  try {
    const response = await fetch(
      `https://api.github.com/repos/GuilhermeSales1/${encodeURIComponent(name)}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
        next: {
          revalidate: 3600,
        },
      },
    );

    if (response.status === 404) {
      return { status: "not-found" as const };
    }

    if (!response.ok) {
      return { status: "error" as const };
    }

    const repo: GithubRepo = await response.json();

    return { status: "success" as const, repo };
  } catch {
    return { status: "error" as const };
  }
};
