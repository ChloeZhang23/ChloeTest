import { test as base, expect } from "@playwright/test";
import {
  isSupportedLanguage,
  translations,
  type SupportedLanguage,
  type TranslationKey
} from "../i18n/languages";

type I18nFixtures = {
  language: SupportedLanguage;
  t: (key: TranslationKey) => string;
};

function projectLanguage(projectMetadata: unknown): SupportedLanguage {
  const language =
    typeof projectMetadata === "object" && projectMetadata !== null && "language" in projectMetadata
      ? String(projectMetadata.language)
      : "";

  if (!isSupportedLanguage(language)) {
    throw new Error(`Project metadata must include a supported language. Received: ${language || "<empty>"}`);
  }

  return language;
}

export const test = base.extend<I18nFixtures>({
  language: async ({}, use, testInfo) => {
    await use(projectLanguage(testInfo.project.metadata));
  },
  t: async ({ language }, use) => {
    await use((key: TranslationKey) => translations[language][key]);
  }
});

export { expect };
