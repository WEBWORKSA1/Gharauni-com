// Uttar Pradesh Bhulekh adapter
// Portal: https://upbhulekh.gov.in
// Notes: CAPTCHA on khata search. Session-stickiness required.
//
// THIS IS A SCAFFOLD. Real selectors must be confirmed by inspecting
// the live portal. UP Bhulekh changes its UI roughly twice a year.

export const upBhulekhAdapter = {
  code: 'up',
  name: 'UP Bhulekh',

  async scrape({ page, input, solveCaptcha }) {
    await page.goto('https://upbhulekh.gov.in', { waitUntil: 'networkidle', timeout: 30000 });

    // Step 1: select district
    if (input.district) {
      await page.locator('select[name="district"]').selectOption({ label: input.district });
      await page.waitForTimeout(800);
    }

    // Step 2: select tehsil (optional, often auto-filled)
    // Step 3: select village
    if (input.village) {
      // Real portal uses cascading dropdowns. This is a scaffold:
      await page.locator('select[name="village"]').selectOption({ label: input.village });
      await page.waitForTimeout(800);
    }

    // Step 4: enter khata or owner search
    if (input.cardId) {
      // Khasra number is part of Gharauni ID — middle 5 digits
      const khasra = input.cardId.split('-')[1];
      await page.locator('input[name="khasra"]').fill(khasra);
    } else if (input.ownerName) {
      await page.locator('input[name="owner"]').fill(input.ownerName);
    }

    // Step 5: solve CAPTCHA
    const captchaImg = await page.locator('img.captcha').screenshot();
    const captchaText = await solveCaptcha(captchaImg.toString('base64'));
    await page.locator('input[name="captcha"]').fill(captchaText);

    // Step 6: submit
    await page.locator('button[type="submit"]').click();
    await page.waitForSelector('.result-table', { timeout: 15000 });

    // Step 7: parse result
    const result = await page.evaluate(() => {
      const rows = document.querySelectorAll('.result-table tr');
      // ... parse cells
      return {
        owner: rows[0]?.querySelector('.owner')?.textContent?.trim() || '',
        khataNumber: rows[0]?.querySelector('.khata')?.textContent?.trim() || '',
        khasraNumber: rows[0]?.querySelector('.khasra')?.textContent?.trim() || '',
        area: rows[0]?.querySelector('.area')?.textContent?.trim() || ''
      };
    });

    return {
      cardId: input.cardId || `UP-${result.khasraNumber}`,
      owner: result.owner,
      village: input.village,
      district: input.district || '',
      state: 'Uttar Pradesh',
      area: result.area,
      areaSqft: parseFloat(result.area) || 0,
      khataNumber: result.khataNumber,
      khasraNumber: result.khasraNumber,
      capturedAt: new Date().toISOString(),
      confidence: 0.9
    };
  }
};
