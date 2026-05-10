// Generic CAPTCHA solver — 2Captcha + AntiCaptcha compatible
import { setTimeout as sleep } from 'timers/promises';

export async function solveCaptcha(imageBase64, apiKey) {
  if (!apiKey) {
    const err = new Error('No CAPTCHA API key configured');
    err.code = 'CAPTCHA_BUDGET_EXHAUSTED';
    throw err;
  }

  // Submit
  const submit = await fetch('https://2captcha.com/in.php', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      key: apiKey,
      method: 'base64',
      body: imageBase64,
      json: '1'
    })
  }).then(r => r.json());

  if (submit.status !== 1) throw new Error(`CAPTCHA submit failed: ${submit.request}`);
  const captchaId = submit.request;

  // Poll for solution (up to 60s)
  for (let i = 0; i < 20; i++) {
    await sleep(3000);
    const res = await fetch(`https://2captcha.com/res.php?key=${apiKey}&action=get&id=${captchaId}&json=1`).then(r => r.json());
    if (res.status === 1) return res.request;
    if (res.request !== 'CAPCHA_NOT_READY') throw new Error(`CAPTCHA solve failed: ${res.request}`);
  }
  throw new Error('CAPTCHA solve timeout');
}
