"use client";

import { useEffect, useState } from "react";
import { localeLabels, locales, type Locale } from "@/lib/i18n/config";

export default function LanguageSwitcher() {
  const [locale, setLocale] = useState<Locale>("en");
  useEffect(() => {
    const match = document.cookie.match(/(?:^|; )arshi-locale=([^;]+)/);
    if (match && locales.includes(decodeURIComponent(match[1]) as Locale)) setLocale(decodeURIComponent(match[1]) as Locale);
  }, []);
  function change(next: Locale) {
    document.cookie = `arshi-locale=${encodeURIComponent(next)}; Path=/; Max-Age=31536000; SameSite=Lax`;
    setLocale(next);
    window.location.reload();
  }
  return (
    <label className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-2 text-xs font-semibold shadow-sm" aria-label="Language selector">
      <span aria-hidden="true">文</span>
      <select value={locale} onChange={(e) => change(e.target.value as Locale)} className="bg-transparent outline-none" title="Language">
        {locales.map((item) => <option key={item} value={item}>{localeLabels[item]}</option>)}
      </select>
    </label>
  );
}
