import assert from "node:assert/strict";
import { access, mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "playwright-core";

const candidateBrowsers = [
  process.env.PLAYWRIGHT_CHROME_PATH,
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
].filter(Boolean);

let executablePath;
for (const candidate of candidateBrowsers) {
  try {
    await access(candidate);
    executablePath = candidate;
    break;
  } catch {
    // Try the next common browser location.
  }
}

assert.ok(
  executablePath,
  "Chrome/Chromium not found. Set PLAYWRIGHT_CHROME_PATH to run UI tests.",
);

const baseUrl = process.env.PREVIEW_URL ?? "http://127.0.0.1:5173";
const outputDirectory = path.join(process.cwd(), "outputs", "visual");
await mkdir(outputDirectory, { recursive: true });

const browser = await chromium.launch({ executablePath, headless: true });
const viewports = [
  { width: 390, height: 844 },
  { width: 768, height: 1024 },
  { width: 1440, height: 1000 },
  { width: 1920, height: 1080 },
];

try {
  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport });
    const runtimeErrors = [];
    page.on("pageerror", (error) => runtimeErrors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") runtimeErrors.push(message.text());
    });

    const response = await page.goto(baseUrl, { waitUntil: "networkidle" });
    assert.equal(response?.status(), 200);
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      true,
      `Horizontal overflow at ${viewport.width}px`,
    );
    await page.screenshot({
      path: path.join(outputDirectory, `home-${viewport.width}.png`),
      fullPage: true,
    });
    assert.deepEqual(runtimeErrors, [], `Runtime errors at ${viewport.width}px`);
    await page.close();
  }

  const mobile = await browser.newPage({ viewport: viewports[0] });
  await mobile.goto(baseUrl, { waitUntil: "networkidle" });
  await mobile.getByRole("button", { name: "Open navigation" }).click();
  await mobile.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "Shop" }).click();
  assert.equal(await mobile.locator(".nav-left").evaluate((element) => element.classList.contains("open")), false);

  await mobile.locator(".product-card").first().getByRole("button", { name: /Add to edit/ }).click();
  await mobile.getByRole("button", { name: "Bag (1)" }).click();
  await mobile.getByRole("dialog").waitFor();
  await mobile.getByRole("button", { name: "Add one The Sol Tote" }).click();
  await mobile.getByRole("button", { name: "Close panel" }).last().click();

  await mobile.getByRole("button", { name: "Open navigation" }).click();
  await mobile.getByRole("navigation", { name: "Main navigation" }).getByRole("button", { name: "Search" }).click();
  await mobile.getByRole("searchbox", { name: "Search products" }).fill("ivory");
  await mobile.getByText("1 demo piece").waitFor();
  await mobile.keyboard.press("Escape");

  await mobile.locator("#email").fill("preview@example.com");
  await mobile.getByRole("button", { name: /Join/ }).click();
  await mobile.getByText("Preview only · No email was submitted").waitFor();
  await mobile.close();
} finally {
  await browser.close();
}

console.log("UI smoke tests passed at 390, 768, 1440 and 1920 px.");
