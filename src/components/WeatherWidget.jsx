import { useEffect, useState } from "react";

// WMO weather codes -> [label, emoji]. Open-Meteo is free and needs no API key.
const WEATHER_CODES = {
  0: ["Clear sky", "☀️"],
  1: ["Mainly clear", "🌤️"],
  2: ["Partly cloudy", "⛅"],
  3: ["Overcast", "☁️"],
  45: ["Fog", "🌫️"],
  48: ["Rime fog", "🌫️"],
  51: ["Light drizzle", "🌦️"],
  53: ["Drizzle", "🌦️"],
  55: ["Dense drizzle", "🌧️"],
  56: ["Freezing drizzle", "🌧️"],
  57: ["Freezing drizzle", "🌧️"],
  61: ["Slight rain", "🌦️"],
  63: ["Rain", "🌧️"],
  65: ["Heavy rain", "🌧️"],
  66: ["Freezing rain", "🌧️"],
  67: ["Freezing rain", "🌧️"],
  71: ["Slight snow", "🌨️"],
  73: ["Snow", "❄️"],
  75: ["Heavy snow", "❄️"],
  77: ["Snow grains", "❄️"],
  80: ["Slight showers", "🌦️"],
  81: ["Showers", "🌧️"],
  82: ["Violent showers", "⛈️"],
  85: ["Snow showers", "🌨️"],
  86: ["Heavy snow showers", "🌨️"],
  95: ["Thunderstorm", "⛈️"],
  96: ["Thunderstorm w/ hail", "⛈️"],
  99: ["Thunderstorm w/ hail", "⛈️"],
};

function describe(code) {
  return WEATHER_CODES[code] || ["Current conditions", "🌡️"];
}

export default function WeatherWidget() {
  // loading | denied | error | ready
  const [status, setStatus] = useState(() =>
    "geolocation" in navigator ? "loading" : "error"
  );
  const [weather, setWeather] = useState(null);
  const [place, setPlace] = useState(null);

  useEffect(() => {
    if (!("geolocation" in navigator)) return;

    let cancelled = false;

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        const { latitude, longitude } = coords;

        try {
          const weatherRes = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
              "&current=temperature_2m,apparent_temperature,weather_code" +
              "&temperature_unit=fahrenheit&wind_speed_unit=mph"
          );
          const weatherData = await weatherRes.json();
          if (cancelled) return;

          if (!weatherData.current) throw new Error("no current weather");
          setWeather(weatherData.current);
          setStatus("ready");
        } catch {
          if (!cancelled) setStatus("error");
          return;
        }

        // Best-effort place label; weather still shows if this fails.
        try {
          const placeRes = await fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
          );
          const placeData = await placeRes.json();
          if (cancelled) return;
          const label = placeData.city || placeData.locality;
          setPlace(
            label
              ? [label, placeData.principalSubdivisionCode?.split("-")[1]]
                  .filter(Boolean)
                  .join(", ")
              : null
          );
        } catch {
          // ignore — place label is optional
        }
      },
      () => {
        if (!cancelled) setStatus("denied");
      },
      { timeout: 10000 }
    );

    return () => {
      cancelled = true;
    };
  }, []);

  const [label, emoji] = weather ? describe(weather.weather_code) : [];

  return (
    <div className="mt-6 w-full rounded-2xl border border-slate-700 bg-slate-900 p-5 text-left">
      <div className="flex items-center gap-2">
        <span className="text-lg">🌎</span>
        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-400">
          Weather Near You
        </h3>
      </div>

      {status === "loading" ? (
        <p className="mt-3 text-sm text-slate-500">Locating you…</p>
      ) : status === "denied" ? (
        <p className="mt-3 text-sm text-slate-500">
          Enable location access in your browser to see local conditions.
        </p>
      ) : status === "error" ? (
        <p className="mt-3 text-sm text-slate-500">
          Couldn't load weather right now.
        </p>
      ) : (
        <div className="mt-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{emoji}</span>
            <div>
              <p className="text-lg font-semibold text-white">
                {Math.round(weather.temperature_2m)}°F
              </p>
              <p className="text-sm text-blue-300">{label}</p>
            </div>
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Feels like {Math.round(weather.apparent_temperature)}°F
            {place ? ` · ${place}` : ""}
          </p>
        </div>
      )}
    </div>
  );
}
