export const translations = {
  "en-US": {
    continue: "Continue",
    pageTitle: "Automation demo",
    welcome: "Welcome"
  },
  "zh-CN": {
    continue: "继续",
    pageTitle: "自动化演示",
    welcome: "欢迎"
  }
} as const;

export type SupportedLanguage = keyof typeof translations;
export type TranslationKey = keyof (typeof translations)["en-US"];

export const defaultLanguages = ["en-US", "zh-CN"] as const satisfies readonly SupportedLanguage[];

export function parseLanguages(value = process.env.TEST_LANGUAGES): SupportedLanguage[] {
  if (!value) {
    return [...defaultLanguages];
  }

  const languages = value
    .split(",")
    .map(language => language.trim())
    .filter(Boolean);

  const unsupportedLanguages = languages.filter(language => !isSupportedLanguage(language));
  if (unsupportedLanguages.length > 0) {
    throw new Error(
      `Unsupported TEST_LANGUAGES value(s): ${unsupportedLanguages.join(", ")}. ` +
        `Supported languages: ${Object.keys(translations).join(", ")}`
    );
  }

  return languages as SupportedLanguage[];
}

export function isSupportedLanguage(language: string): language is SupportedLanguage {
  return Object.hasOwn(translations, language);
}
