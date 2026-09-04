"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(true);
  useEffect(() => setDark(document.documentElement.classList.contains("dark")), []);
  function toggle() {
    const next = !dark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("arshi-theme", next ? "dark" : "light");
    setDark(next);
  }
  return <button type="button" onClick={toggle} aria-label={`Switch to ${dark ? "light" : "dark"} mode`} className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card/70 text-muted-foreground transition hover:text-foreground">{dark ? <Sun size={17} /> : <Moon size={17} />}</button>;
}
