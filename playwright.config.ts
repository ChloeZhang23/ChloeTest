import { defineConfig, devices } from "@playwright/test";
import { parseLanguages } from "./tests/i18n/languages";

const baseURL = process.env.BASE_URL ?? "http://localhost:3000";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["list"], ["html", { open: "never" }]],
  outputDir: "test-results",
  use: {
    baseURL,
    screenshot: "only-on-failure",
    trace: "on-first-retry",
    video: "retain-on-failure"
  },
  projects: parseLanguages().map(language => ({
    name: `chromium-${language}`,
    metadata: { language },
    use: {
      ...devices["Desktop Chrome"],
      locale: language,
      extraHTTPHeaders: {
        "Accept-Language": language
      }
    }
  }))
});
