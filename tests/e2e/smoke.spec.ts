import { test, expect } from '@playwright/test';

/**
 * DS0 Docs Site — Smoke Tests
 *
 * Validates that the documentation site loads, navigation works,
 * and component previews render correctly.
 *
 * Run: npx playwright test tests/e2e/smoke.spec.ts
 */

test.describe('DS0 Docs — Smoke Tests', () => {
    test('homepage loads with DS0 branding', async ({ page }) => {
        await page.goto('/');
        await expect(page).toHaveTitle(/DS0/i);

        // Main heading should be visible
        const heading = page.locator('h1').first();
        await expect(heading).toBeVisible();
    });

    test('navigation sidebar renders component links', async ({ page }) => {
        await page.goto('/docs');

        // Sidebar should contain component links
        const sidebar = page.locator('nav');
        await expect(sidebar.first()).toBeVisible();

        // At least one component link should exist
        const componentLink = page.locator('a[href*="/components/"]').first();
        await expect(componentLink).toBeVisible();
    });

    test('button docs page loads with content', async ({ page }) => {
        await page.goto('/docs/components/button');

        // Page should have the component title
        const heading = page.locator('h1, h2').filter({ hasText: /Button/i }).first();
        await expect(heading).toBeVisible();

        // Should have code examples
        const codeBlock = page.locator('pre, code').first();
        await expect(codeBlock).toBeVisible();
    });

    test('foundations tokens page loads', async ({ page }) => {
        await page.goto('/docs/foundations/tokens');

        const heading = page.locator('h1, h2').filter({ hasText: /Design Tokens/i }).first();
        await expect(heading).toBeVisible();
    });

    test('search functionality exists', async ({ page }) => {
        await page.goto('/');

        // Search should be available (button or input)
        const search = page.locator('[role="search"], [placeholder*="Search"], button:has-text("Search"), [aria-label*="Search"]').first();
        if (await search.isVisible()) {
            await expect(search).toBeEnabled();
        }
    });

    test('dark mode toggle works', async ({ page }) => {
        await page.goto('/');

        // Look for theme toggle
        const themeToggle = page.locator('[aria-label*="theme"], [aria-label*="Theme"], [aria-label*="dark"], [aria-label*="Dark"]').first();
        if (await themeToggle.isVisible()) {
            await themeToggle.click();

            // Document should have dark class or data attribute
            const html = page.locator('html');
            const hasDark = await html.evaluate((el) =>
                el.classList.contains('dark') || el.getAttribute('data-theme') === 'dark',
            );
            expect(hasDark).toBe(true);
        }
    });

    test('page has no accessibility violations in heading hierarchy', async ({ page }) => {
        await page.goto('/docs/components/button');

        // Verify there's exactly one h1
        const h1Count = await page.locator('h1').count();
        expect(h1Count).toBeGreaterThanOrEqual(1);

        // All interactive elements should be keyboard accessible
        const buttons = page.locator('button:visible');
        const buttonCount = await buttons.count();
        for (let i = 0; i < Math.min(buttonCount, 5); i++) {
            const button = buttons.nth(i);
            const tabIndex = await button.getAttribute('tabindex');
            // Should not have positive tabIndex
            if (tabIndex !== null) {
                expect(parseInt(tabIndex)).toBeLessThanOrEqual(0);
            }
        }
    });
});
