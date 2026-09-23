import { useEffect, useState } from "react";

export default function ClockDate() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const dateStr = now.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
  const timeStr = now.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  });
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <div
      className="flex items-baseline gap-2 text-sm text-slate-400"
      title={tz}
    >
      <span className="font-medium text-slate-300">{dateStr}</span>
      <span className="tabular-nums text-slate-500">{timeStr}</span>
    </div>
  );
}
