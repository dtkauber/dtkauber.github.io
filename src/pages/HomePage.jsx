import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import ExperienceMap from "../components/ExperienceMap";
import GithubActivity from "../components/GithubActivity";
import Projects from "../components/Projects";
import YankeeOfTheDay from "../components/YankeeOfTheDay";

export default function HomePage() {
  const profileImageUrl = `${import.meta.env.BASE_URL}headshot.jpg`;

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100">
      <header className="w-full border-b border-slate-800">
        <div className="mx-auto flex max-w-6xl justify-end px-8 py-6">
          <nav className="flex gap-8 text-lg text-slate-300">
            <a href="#about" className="cursor-pointer transition hover:text-white">
              About
            </a>
            <a href="#experience" className="cursor-pointer transition hover:text-white">
              Experience
            </a>
            <a href="#projects" className="cursor-pointer transition hover:text-white">
              Projects
            </a>
            <a href="#activity" className="cursor-pointer transition hover:text-white">
              Activity
            </a>
            <a
              href={`${import.meta.env.BASE_URL}resume.pdf`}
              target="_blank"
              rel="noreferrer"
              className="cursor-pointer transition hover:text-white"
            >
              Resume
            </a>
          </nav>
        </div>
      </header>

      <main className="w-full px-8 py-8">
        <div className="mx-auto grid max-w-6xl grid-cols-[320px_1fr] gap-10">
          <aside className="border-r border-slate-800 pr-8">
            <div className="flex flex-col items-center text-center">
              <h1 className="text-4xl font-bold text-white">Daniel Kauber</h1>

              <div className="mt-8 h-64 w-64 overflow-hidden rounded-full border-[6px] border-slate-300 shadow-xl">
                <img
                  src={profileImageUrl}
                  alt="Daniel Kauber headshot"
                  className="h-full w-full object-cover"
                />
              </div>

              <p className="mt-6 text-xl text-slate-300">
                Data Science | Analytics
              </p>

              <div className="mt-8 flex items-center justify-center gap-6">
                <a
                  href="https://www.linkedin.com/in/daniel-kauber/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-slate-500 text-2xl text-slate-200 transition hover:border-blue-300 hover:text-blue-300"
                >
                  <FaLinkedinIn />
                </a>

                <a
                  href="https://github.com/dtkauber"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="GitHub"
                  className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-slate-500 text-2xl text-slate-200 transition hover:border-blue-300 hover:text-blue-300"
                >
                  <FaGithub />
                </a>

                <a
                  href="mailto:dtkauber@gmail.com"
                  aria-label="Email"
                  className="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full border border-slate-500 text-2xl text-slate-200 transition hover:border-blue-300 hover:text-blue-300"
                >
                  <HiOutlineMail />
                </a>
              </div>

              <p className="mt-10 text-xl text-slate-300">
                Pleasantville, NY | Chapel Hill, NC
              </p>
              <YankeeOfTheDay />
            </div>
          </aside>

          <section className="min-h-[70vh] space-y-16">
            <div id="about">
              <h2 className="text-3xl font-semibold text-white">About</h2>

              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
                I'm a senior at the University of North Carolina at Chapel Hill
                majoring in Statistics and Computer Science. I have a profound
                interest in data analytics, science, and engineering, and aspire
                to build a career at the intersection of these fields. I have
                experience with many data tools and techniques, and I am always
                looking to learn more. Please connect with me if you want to chat
                about data science, analytics, or anything else!
              </p>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
                  <h3 className="text-xl font-semibold text-white">Skills</h3>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {["Python", "SQL", "R", "Java", "JavaScript", "Pandas", "Scikit-learn", "Power BI", "Tableau", "Docker"].map((s) => (
                      <span
                        key={s}
                        className="rounded-md bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-300"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
                  <h3 className="text-xl font-semibold text-white">Education</h3>
                  <p className="mt-2 text-sm font-medium text-slate-200">
                    UNC Chapel Hill
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    B.S. Statistics & Computer Science, Minor in History · GPA
                    3.71 · Class of 2027
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-700 bg-slate-900 p-5">
                  <h3 className="text-xl font-semibold text-white">Leadership</h3>
                  <p className="mt-2 text-sm font-medium text-slate-200">
                    President, UNC Ice Hockey
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    Managed operations for 30+ athletes and secured $300K+ in
                    funding through partnerships.
                  </p>
                </div>
              </div>
            </div>

            <div id="experience">
              <h2 className="text-3xl font-semibold text-white">Experience</h2>
              <p className="mt-2 text-sm text-slate-500">
                Places across the US where my journey has taken me.
              </p>
              <div className="mt-6">
                <ExperienceMap />
              </div>
            </div>

            <div id="projects">
              <h2 className="text-3xl font-semibold text-white">Projects</h2>
              <p className="mt-2 text-sm text-slate-500">
                A few things I've built across data science, ML, and software.
              </p>
              <div className="mt-6">
                <Projects/>
              </div>
            </div>

            <div id="activity">
              <h2 className="text-3xl font-semibold text-white">Activity</h2>
              <p className="mt-2 text-sm text-slate-500">
                What I've been shipping lately on GitHub.
              </p>
              <div className="mt-6">
                <GithubActivity />
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
