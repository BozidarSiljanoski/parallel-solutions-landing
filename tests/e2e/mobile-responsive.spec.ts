import { expect, test } from "@playwright/test";

test.describe("Mobile responsive UI", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("header is visible and mobile menu opens", async ({ page }) => {
    await expect(page.getByTestId("site-header")).toBeVisible();
    await expect(page.getByTestId("site-logo")).toBeVisible();

    const desktopNav = page.getByTestId("desktop-nav");
    const mobileTrigger = page.getByTestId("mobile-menu-trigger");

    if (await desktopNav.isVisible()) {
      await expect(desktopNav.getByRole("link", { name: "Contact" })).toBeVisible();
    } else {
      await mobileTrigger.click();
      const mobileNav = page.getByTestId("mobile-nav");
      await expect(mobileNav).toBeVisible();
      await expect(mobileNav.getByRole("link", { name: "Services" })).toBeVisible();
      await expect(page.getByTestId("mobile-book-call")).toBeVisible();
    }
  });

  test("hero section stacks without horizontal overflow", async ({ page }) => {
    await expect(page.getByTestId("hero-section")).toBeVisible();

    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth + 2;
    });
    expect(hasOverflow).toBe(false);

    await expect(page.getByTestId("hero-book-call")).toBeVisible();
    await expect(page.getByTestId("hero-contact")).toBeVisible();
  });

  test("stats section displays in grid on small screens", async ({ page }) => {
    const stats = page.getByTestId("stats-section");
    await stats.scrollIntoViewIfNeeded();
    await expect(stats).toBeVisible();
    await expect(stats.getByText("60K+")).toBeVisible();
    await expect(stats.getByText("200+")).toBeVisible();
  });

  test("services cards are readable on mobile", async ({ page }) => {
    const services = page.getByTestId("services-section");
    await services.scrollIntoViewIfNeeded();
    await expect(services.getByRole("heading", { name: "Our services" })).toBeVisible();
    await expect(services.getByText("SDR Outsourcing")).toBeVisible();
  });

  test("case study cards link correctly", async ({ page }) => {
    const section = page.getByTestId("case-studies-section");
    await section.scrollIntoViewIfNeeded();
    await expect(page.getByTestId("case-study-card-nexus-analytics")).toBeVisible();
    await page.getByTestId("case-study-link-nexus-analytics").click();
    await expect(page).toHaveURL(/case-studies\/nexus-analytics/);
    await expect(page.getByTestId("case-study-nexus-analytics")).toBeVisible();
  });

  test("CTA banners are visible and tappable", async ({ page }) => {
    const cta = page.getByTestId("cta-banner").first();
    await cta.scrollIntoViewIfNeeded();
    await expect(cta).toBeVisible();
    await expect(page.getByTestId("cta-book-call").first()).toBeVisible();
  });

  test("booking section renders calendar and slots", async ({ page }) => {
    const section = page.getByTestId("booking-section");
    await section.scrollIntoViewIfNeeded();
    await expect(section).toBeVisible();
    await expect(page.getByTestId("booking-calendar")).toBeVisible();
    await expect(page.getByTestId("booking-slots")).toBeVisible();
  });

  test("design references are present", async ({ page }) => {
    const heroRefs = page
      .getByTestId("hero-section")
      .getByTestId("design-references");
    await expect(heroRefs).toBeVisible();
    await expect(heroRefs.getByTestId("reference-amiy")).toBeVisible();
    await expect(heroRefs.getByTestId("reference-salesroads")).toBeVisible();
    await expect(heroRefs.getByTestId("reference-injini-consulting")).toBeVisible();
  });

  test("footer is visible with book call link", async ({ page }) => {
    await page.getByTestId("site-footer").scrollIntoViewIfNeeded();
    await expect(page.getByTestId("site-footer")).toBeVisible();
    await expect(page.getByTestId("footer-book-call")).toBeVisible();
  });
});
