import { useEffect, useState } from "react";
import { FaGithub, FaStar } from "react-icons/fa";

const USERNAME = "dtkauber";

// A small subset of GitHub's language colors; unlisted languages fall back to slate.
const LANGUAGE_COLORS = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  Python: "#3572A5",
  Java: "#b07219",
  "Jupyter Notebook": "#DA5B0B",
  HTML: "#e34c26",
  CSS: "#563d7c",
  R: "#198CE7",
  Shell: "#89e051",
  Go: "#00ADD8",
  "C++": "#f34b7d",
};

function relativeTime(dateStr) {
  const diffSec = Math.round((Date.now() - new Date(dateStr).getTime()) / 1000);
  const units = [
    ["year", 31536000],
    ["month", 2592000],
    ["week", 604800],
    ["day", 86400],
    ["hour", 3600],
    ["minute", 60],
  ];
  for (const [unit, secs] of units) {
    const value = Math.floor(diffSec / secs);
    if (value >= 1) return `${value} ${unit}${value > 1 ? "s" : ""} ago`;
  }
  return "just now";
}

export default function GithubActivity() {
  const [repos, setRepos] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(
          `https://api.github.com/users/${USERNAME}/repos?sort=pushed&per_page=8`
        );
        if (!res.ok) throw new Error("bad response");
        const data = await res.json();
        if (cancelled) return;
        setRepos(data.filter((r) => !r.fork).slice(0, 5));
      } catch {
        if (!cancelled) setFailed(true);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FaGithub className="text-lg text-slate-400" />
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
            Recent GitHub Activity
          </h3>
        </div>
        <a
          href={`https://github.com/${USERNAME}`}
          target="_blank"
          rel="noreferrer"
          className="cursor-pointer text-xs font-medium text-blue-300 transition hover:text-blue-200"
        >
          @{USERNAME} →
        </a>
      </div>

      {failed ? (
        <p className="mt-4 text-sm text-slate-500">
          Couldn't load activity right now.{" "}
          <a
            href={`https://github.com/${USERNAME}`}
            target="_blank"
            rel="noreferrer"
            className="text-blue-300 hover:text-blue-200"
          >
            View on GitHub
          </a>
          .
        </p>
      ) : !repos ? (
        <p className="mt-4 text-sm text-slate-500">Loading…</p>
      ) : repos.length === 0 ? (
        <p className="mt-4 text-sm text-slate-500">No recent public activity.</p>
      ) : (
        <ul className="mt-4 divide-y divide-slate-800">
          {repos.map((repo) => (
            <li key={repo.id} className="py-3 first:pt-0 last:pb-0">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between gap-3 text-sm font-medium text-white transition hover:text-blue-300"
              >
                <span className="truncate">{repo.name}</span>
                <span className="shrink-0 text-xs font-normal text-slate-500">
                  {relativeTime(repo.pushed_at)}
                </span>
              </a>
              {repo.description && (
                <p className="mt-1 truncate text-xs text-slate-400">
                  {repo.description}
                </p>
              )}
              <div className="mt-1.5 flex items-center gap-3 text-xs text-slate-500">
                {repo.language && (
                  <span className="flex items-center gap-1.5">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{
                        backgroundColor: LANGUAGE_COLORS[repo.language] || "#64748b",
                      }}
                    />
                    {repo.language}
                  </span>
                )}
                {repo.stargazers_count > 0 && (
                  <span className="flex items-center gap-1">
                    <FaStar className="text-[10px]" />
                    {repo.stargazers_count}
                  </span>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
