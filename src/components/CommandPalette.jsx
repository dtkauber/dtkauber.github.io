import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  const goTo = useCallback((id) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const commands = useMemo(
    () => [
      { id: "about", label: "Go to About", hint: "Section", action: () => goTo("about") },
      { id: "experience", label: "Go to Experience", hint: "Section", action: () => goTo("experience") },
      { id: "projects", label: "Go to Projects", hint: "Section", action: () => goTo("projects") },
      { id: "activity", label: "Go to Activity", hint: "Section", action: () => goTo("activity") },
      { id: "hobbies", label: "View Hobbies & Interests", hint: "Page", action: () => navigate("/about/hobbies") },
      {
        id: "resume",
        label: "Open Resume",
        hint: "PDF",
        action: () => window.open(`${import.meta.env.BASE_URL}resume.pdf`, "_blank", "noreferrer"),
      },
      {
        id: "github",
        label: "Open GitHub Profile",
        hint: "External",
        action: () => window.open("https://github.com/dtkauber", "_blank", "noreferrer"),
      },
      {
        id: "linkedin",
        label: "Open LinkedIn Profile",
        hint: "External",
        action: () => window.open("https://www.linkedin.com/in/daniel-kauber/", "_blank", "noreferrer"),
      },
      {
        id: "email",
        label: "Copy Email Address",
        hint: "dtkauber@gmail.com",
        action: async () => {
          try {
            await navigator.clipboard.writeText("dtkauber@gmail.com");
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
          } catch {
            window.location.href = "mailto:dtkauber@gmail.com";
          }
        },
      },
    ],
    [goTo, navigate]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => c.label.toLowerCase().includes(q));
  }, [commands, query]);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(0);
  }, []);

  const run = useCallback(
    (cmd) => {
      if (!cmd) return;
      cmd.action();
      close();
    },
    [close]
  );

  useEffect(() => {
    function onKeyDown(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
        return;
      }
      if (e.key === "Escape") {
        setOpen((prev) => {
          if (prev) close();
          return prev;
        });
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [close]);

  useEffect(() => {
    if (open) {
      const raf = requestAnimationFrame(() => inputRef.current?.focus());
      return () => cancelAnimationFrame(raf);
    }
  }, [open]);

  function onQueryChange(e) {
    setQuery(e.target.value);
    setActiveIndex(0);
  }

  function onInputKeyDown(e) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(filtered[activeIndex]);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex cursor-pointer items-center gap-2 rounded-lg border border-slate-700 bg-slate-900 px-3 py-1.5 text-xs text-slate-400 transition hover:border-slate-500 hover:text-slate-200"
        aria-label="Open command palette"
      >
        <span>Quick actions</span>
        <kbd className="rounded border border-slate-600 bg-slate-800 px-1.5 py-0.5 font-mono text-[10px] text-slate-400">
          Ctrl K
        </kbd>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-slate-950/70 px-4 pt-24 backdrop-blur-sm"
          onClick={close}
        >
          <div
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              ref={inputRef}
              value={query}
              onChange={onQueryChange}
              onKeyDown={onInputKeyDown}
              placeholder="Type a command…"
              className="w-full border-b border-slate-800 bg-transparent px-5 py-4 text-base text-white placeholder:text-slate-500 focus:outline-none"
            />
            <ul className="max-h-80 overflow-y-auto py-2">
              {filtered.length === 0 ? (
                <li className="px-5 py-6 text-center text-sm text-slate-500">
                  No matching commands.
                </li>
              ) : (
                filtered.map((cmd, i) => (
                  <li key={cmd.id}>
                    <button
                      type="button"
                      onClick={() => run(cmd)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`flex w-full cursor-pointer items-center justify-between px-5 py-2.5 text-left text-sm transition ${
                        i === activeIndex
                          ? "bg-blue-500/10 text-white"
                          : "text-slate-300"
                      }`}
                    >
                      <span>{cmd.label}</span>
                      <span className="text-xs text-slate-500">
                        {cmd.id === "email" && copied ? "Copied!" : cmd.hint}
                      </span>
                    </button>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
