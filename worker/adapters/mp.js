// Madhya Pradesh Bhu-Abhilekh adapter
// Portal: https://mpbhuabhilekh.nic.in
// Notes: Two-stage CAPTCHA. Slower than UP.

export const mpBhulekhAdapter = {
  code: 'mp',
  name: 'MP Bhu-Abhilekh',

  async scrape({ page, input, solveCaptcha }) {
    await page.goto('https://mpbhuabhilekh.nic.in', { waitUntil: 'networkidle', timeout: 45000 });
    // ... district/village/khasra flow (scaffold — confirm selectors against live portal)

    return {
      cardId: input.cardId || `MP-stub`,
      owner: 'TBD — implement after selectors confirmed',
      village: input.village,
      district: input.district || '',
      state: 'Madhya Pradesh',
      area: '0',
      areaSqft: 0,
      capturedAt: new Date().toISOString(),
      confidence: 0
    };
  }
};
