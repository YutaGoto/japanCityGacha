import { describe } from "node:test"
import { expect, test } from "@playwright/test"

test("go home", async ({ page }) => {
  await page.goto("./")
  await expect(page).toHaveTitle("日本の市町村ガチャ")
})

test("show heading", async ({ page }) => {
  await page.goto("./")
  await expect(page.getByRole("heading", { name: "市区町村ガチャ" })).toBeVisible()
})

describe("prefectures", () => {
  test("check Random Prefecture", async ({ page }) => {
    await page.goto("./")

    await page.getByRole('checkbox', { name: 'ランダムで都道府県を選択' }).check();
    await expect(page.getByRole('button', { name: '都道府県ランダム選択' })).toBeEnabled();
  })

  test("uncheck Random Prefecture", async ({ page }) => {
    await page.goto("./")

    await page.getByRole('checkbox', { name: 'ランダムで都道府県を選択' }).uncheck();
    await expect(page.getByRole('button', { name: '都道府県ランダム選択' })).toBeDisabled();
  })
})
