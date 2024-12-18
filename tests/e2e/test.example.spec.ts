import { expect, test } from "@playwright/test";

test("page returns 200 status", ({ page }) => {
  return page.goto("/").then((response) => {
    expect(response?.status()).toBe(200);
  });
});
