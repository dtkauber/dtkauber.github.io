import { useState } from "react";
import { FaGithub } from "react-icons/fa";

const USERNAME = "dtkauber";
const GRAPH_URL =
  `https://github-readme-activity-graph.vercel.app/graph?username=${USERNAME}` +
  "&bg_color=0f172a&color=94a3b8&line=60a5fa&point=93c5fd" +
  "&area=true&area_color=3b82f6&title_color=f8fafc&hide_border=true";

export default function GithubActivity() {
  const [failed, setFailed] = useState(false);

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
          Couldn't load activity graph right now.{" "}
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
      ) : (
        <img
          src={GRAPH_URL}
          alt={`${USERNAME}'s GitHub contribution activity graph`}
          className="mt-4 w-full"
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
