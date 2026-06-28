import { test, expect, type Page } from '@playwright/test'

async function waitForChatReady(page: Page) {
  await expect(page.getByRole('region', { name: 'Portfolio loading' })).not.toBeVisible({
    timeout: 20000,
  })
  await expect(page.getByRole('log', { name: 'Conversation' })).toContainText("Hello, I'm Chris", {
    timeout: 5000,
  })
}

test.describe('Portfolio home page', () => {
  test('has correct page title', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle(/Chris Hackett/)
  })

  test('shows the loading intro overlay on initial visit', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('region', { name: 'Portfolio loading' })).toBeVisible()
  })

  test('loading overlay disappears after animation completes', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('region', { name: 'Portfolio loading' })).not.toBeVisible({
      timeout: 20000,
    })
  })

  test('initial chat messages and chatbar are shown after intro completes', async ({ page }) => {
    await page.goto('/')
    await waitForChatReady(page)

    const conversation = page.getByRole('log', { name: 'Conversation' })
    await expect(conversation).toBeVisible()
    await expect(page.getByRole('region', { name: 'Chat input' })).toBeVisible()
  })

  test('clicking a chatbar prompt sends a message and shows a response', async ({ page }) => {
    await page.goto('/')
    await waitForChatReady(page)

    await page.getByRole('button', { name: 'Toggle chat options' }).click()
    await expect(page.locator('#option-picker')).toBeVisible()

    await page.getByRole('button', { name: 'What projects have you worked on?' }).click()

    const conversation = page.getByRole('log', { name: 'Conversation' })
    await expect(conversation).toContainText('What projects have you worked on?')
    await expect(conversation.getByRole('heading', { name: 'Projects' })).toBeVisible({
      timeout: 5000,
    })
  })

  test('clicking the theme icon switches the page theme', async ({ page }) => {
    await page.goto('/')
    await waitForChatReady(page)

    const html = page.locator('html')
    const wasDark = await html.evaluate((el) => el.classList.contains('dark'))

    const toggleLabel = wasDark ? 'Switch to light mode' : 'Switch to dark mode'
    await page.getByRole('button', { name: toggleLabel }).click()

    if (wasDark) {
      await expect(html).not.toHaveClass(/\bdark\b/)
    } else {
      await expect(html).toHaveClass(/\bdark\b/)
    }
  })

  test('clicking the reader mode link navigates to the plain HTML view', async ({ page }) => {
    await page.goto('/')
    await waitForChatReady(page)

    await page.getByRole('link', { name: 'View plain HTML version' }).click()

    await expect(page).toHaveURL(/\?plain/)
    await expect(page.locator('html')).toHaveClass(/\bplain\b/)
  })

  test('loading a 404 URL shows an additional chat message', async ({ page }) => {
    await page.goto('/does-not-exist')
    await waitForChatReady(page)

    await expect(
      page.getByRole('log', { name: 'Conversation' }).getByText('One more thing', { exact: false }),
    ).toBeVisible({ timeout: 5000 })
  })
})
