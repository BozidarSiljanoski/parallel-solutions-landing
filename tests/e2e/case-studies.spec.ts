import { expect, test } from "@playwright/test";

const slugs = [
  "nexus-analytics",
  "vertex-systems",
  "horizon-health",
  "cascade-logistics",
];

test.describe("Case study pages", () => {
  for (const slug of slugs) {
    test(`${slug} page renders on mobile`, async ({ page }) => {
      await page.goto(`/case-studies/${slug}`);
      await expect(page.getByTestId(`case-study-${slug}`)).toBeVisible();
      await expect(page.getByTestId("case-study-hero")).toBeVisible();
      await expect(page.getByTestId("design-references")).toBeVisible();
      await expect(page.getByTestId("case-study-book-call")).toBeVisible();

      const hasOverflow = await page.evaluate(() => {
        return document.documentElement.scrollWidth > document.documentElement.clientWidth + 2;
      });
      expect(hasOverflow).toBe(false);
    });
  }

  test("invalid slug returns 404", async ({ page }) => {
    const response = await page.goto("/case-studies/not-a-real-slug");
    expect(response?.status()).toBe(404);
  });
});
