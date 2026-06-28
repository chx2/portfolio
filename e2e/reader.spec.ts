import { test, expect } from '@playwright/test'

test.describe('Reader (plain) mode', () => {
  test('renders static portfolio content without JavaScript', async ({ page }) => {
    await page.goto('/?plain')
    await expect(page.locator('h1')).toContainText('Chris Hackett')
  })

  test('shows all major content sections', async ({ page }) => {
    await page.goto('/?plain')
    const headings = page.locator('h2')
    await expect(headings.filter({ hasText: 'About' })).toBeVisible()
    await expect(headings.filter({ hasText: 'Experience' })).toBeVisible()
    await expect(headings.filter({ hasText: 'Projects' })).toBeVisible()
    await expect(headings.filter({ hasText: 'Skills' })).toBeVisible()
    await expect(headings.filter({ hasText: 'Contact' })).toBeVisible()
  })

  test('contact section has a mailto link', async ({ page }) => {
    await page.goto('/?plain')
    await expect(page.locator('a[href^="mailto:"]')).toBeVisible()
  })
})
