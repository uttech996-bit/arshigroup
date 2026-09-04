export const locales = ["en", "ur", "roman"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
export const localeLabels: Record<Locale, string> = { en: "English", ur: "اردو", roman: "Roman Urdu" };
export const localeDirections: Record<Locale, "ltr" | "rtl"> = { en: "ltr", ur: "rtl", roman: "ltr" };
export function isLocale(value: string | null | undefined): value is Locale { return !!value && (locales as readonly string[]).includes(value); }
export const translations = {
  en: { language: "Language", home: "Home", services: "Services", about: "About", portfolio: "Portfolio", blog: "Blog", contact: "Contact", dashboard: "Client Dashboard", getStarted: "Get Started", privacy: "Privacy Policy", terms: "Terms of Service", cookies: "Cookie Policy", disclaimer: "Disclaimer" },
  ur: { language: "زبان", home: "ہوم", services: "سروسز", about: "ہمارے بارے میں", portfolio: "پورٹ فولیو", blog: "بلاگ", contact: "رابطہ", dashboard: "کلائنٹ ڈیش بورڈ", getStarted: "شروع کریں", privacy: "پرائیویسی پالیسی", terms: "شرائط و ضوابط", cookies: "کوکی پالیسی", disclaimer: "ڈس کلیمر" },
  roman: { language: "Zaban", home: "Home", services: "Services", about: "Hamare Bare Mein", portfolio: "Portfolio", blog: "Blog", contact: "Rabta", dashboard: "Client Dashboard", getStarted: "Shuru Karein", privacy: "Privacy Policy", terms: "Terms of Service", cookies: "Cookie Policy", disclaimer: "Disclaimer" },
} as const;
export type TranslationKey = keyof typeof translations.en;
