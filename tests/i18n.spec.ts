import { test, expect } from "./fixtures/test";
import { DemoPage } from "./pages/demo.page";

test.describe("multi-language smoke test", () => {
  test("renders translated content for the active project language", async ({ page, language, t }) => {
    const demoPage = new DemoPage(page, t);

    await demoPage.open(language);

    await expect(page).toHaveTitle(t("pageTitle"));
    await expect(page.locator("html")).toHaveAttribute("lang", language);
    await expect(demoPage.heading()).toBeVisible();
    await expect(demoPage.continueButton()).toBeVisible();
  });
});
