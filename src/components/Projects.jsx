const PROJECTS = [
  {
    id: 1,
    title: "Fantasy Hockey Analytics Platform",
    icon: "🏒",
    tags: ["React", "TypeScript", "FastAPI", "PostgreSQL", "OpenAI API"],
    description:
      "Full-stack platform ingesting 1,300+ NHL games into a custom scoring engine and Postgres schema. Built empirical-Bayes projections and a VORP/VONA draft engine, with a chatbot shipped via the OpenAI API.",
    github: "https://github.com/dtkauber/fantasy-hockey",
  },
  {
    id: 2,
    title: "Serverless Crypto Market Data Pipeline",
    icon: "📈",
    tags: ["Python", "AWS Lambda", "S3", "EventBridge", "Streamlit"],
    description:
      "Serverless AWS ETL pipeline ingesting crypto market data into S3 via chained Lambda functions. Queried the data with AWS Glue and Athena, and visualized trends in a Streamlit dashboard.",
    github: "https://github.com/dtkauber/crypto-pipeline",
    demo: "https://crypto-pipeline-7ytvjepkjy7gqtmzf5tv4p.streamlit.app/",
  },
  {
    id: 3,
    title: "NBA MVP Prediction Model",
    icon: "🏆",
    tags: ["Python", "Pandas", "Scikit-learn", "nba_api"],
    description:
      "Trained linear, logistic, and Random Forest models on 15 seasons of NBA player stats via nba_api to predict MVP voting. Season-level cross-validation ranks the true MVP in the top 3 100% of the time.",
    github: "https://github.com/dtkauber/nba-fas-MVP-pred-model",
  },
  {
    id: 4,
    title: "Personal Website",
    icon: "💻",
    tags: ["React", "JavaScript", "Tailwind CSS"],
    description:
      "Designed and deployed this portfolio site to showcase my background, projects, and technical skills — including the interactive experience map you're looking at now.",
    github: "https://github.com/dtkauber/dtkauber.github.io",
  },
];

function ProjectCard({ project }) {
  return (
    <div className="group h-56 [perspective:1000px]">
      <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900 p-6 [backface-visibility:hidden]">
          <div>
            <span className="text-3xl">{project.icon}</span>
            <h3 className="mt-3 text-lg font-semibold text-white">{project.title}</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute inset-0 flex flex-col justify-between rounded-2xl border border-blue-400/40 bg-slate-800 p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <p className="text-sm leading-6 text-slate-300">{project.description}</p>
          {project.github || project.demo ? (
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-pointer text-sm font-medium text-blue-300 transition hover:text-blue-200"
                >
                  → Live Demo
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-pointer text-sm font-medium text-blue-300 transition hover:text-blue-200"
                >
                  → View on GitHub
                </a>
              )}
            </div>
          ) : (
            <span className="text-xs text-slate-500">Description only</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {PROJECTS.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
