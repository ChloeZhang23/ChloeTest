import type { Page } from "@playwright/test";
import type { SupportedLanguage, TranslationKey } from "../i18n/languages";

type Translate = (key: TranslationKey) => string;

export class DemoPage {
  constructor(
    private readonly page: Page,
    private readonly t: Translate
  ) {}

  async open(language: SupportedLanguage): Promise<void> {
    await this.page.setContent(`
      <!doctype html>
      <html lang="${language}">
        <head>
          <meta charset="utf-8" />
          <title>${this.t("pageTitle")}</title>
        </head>
        <body>
          <main>
            <h1>${this.t("welcome")}</h1>
            <button aria-label="${this.t("continue")}">${this.t("continue")}</button>
          </main>
        </body>
      </html>
    `);
  }

  heading() {
    return this.page.getByRole("heading", { name: this.t("welcome") });
  }

  continueButton() {
    return this.page.getByRole("button", { name: this.t("continue") });
  }
}
