import { expect, test } from "@playwright/test";

test.describe("Contact page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/contact");
  });

  test("renders contact form fields on mobile", async ({ page }) => {
    await expect(page.getByTestId("contact-page-title")).toBeVisible();
    await expect(page.getByTestId("contact-form")).toBeVisible();
    await expect(page.getByTestId("contact-first-name")).toBeVisible();
    await expect(page.getByTestId("contact-email")).toBeVisible();
    await expect(page.getByTestId("contact-message")).toBeVisible();
    await expect(page.getByTestId("contact-submit")).toBeVisible();
  });

  test("required fields block submit when empty", async ({ page }) => {
    await page.getByTestId("contact-submit").click();
    await expect(page.getByTestId("contact-success")).not.toBeVisible();
    await expect(page.getByTestId("contact-first-name")).toBeVisible();
    const invalidCount = await page
      .getByTestId("contact-form")
      .locator(":invalid")
      .count();
    expect(invalidCount).toBeGreaterThan(0);
  });

  test("form layout has no horizontal overflow on mobile", async ({ page }) => {
    const hasOverflow = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth + 2;
    });
    expect(hasOverflow).toBe(false);
  });

  test("slot query param prefills meeting time", async ({ page }) => {
    const slot = new Date();
    slot.setDate(slot.getDate() + 2);
    slot.setHours(10, 0, 0, 0);
    while (slot.getDay() === 0 || slot.getDay() === 6) {
      slot.setDate(slot.getDate() + 1);
    }

    await page.goto(`/contact?slot=${encodeURIComponent(slot.toISOString())}`);
    const meetingInput = page.getByTestId("contact-meeting-slot");
    await expect(meetingInput).toBeVisible();
    await expect(meetingInput).not.toHaveValue("");
  });
});
