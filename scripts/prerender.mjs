import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import puppeteer from 'puppeteer-core';

const chrome = [process.env.CHROME_PATH, '/usr/local/bin/google-chrome', '/usr/bin/google-chrome', '/usr/bin/chromium']
  .find((path) => path && existsSync(path));
const port = 4173;

function wait(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }

let preview = null;
try {
  let up = false;
  try { up = (await fetch(`http://127.0.0.1:${port}/`)).ok; } catch { up = false; }
  if (!up) {
    preview = spawn('npx', ['vite', 'preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'], {
      stdio: 'ignore',
    });
    for (let i = 0; i < 40; i += 1) {
      try {
        const res = await fetch(`http://127.0.0.1:${port}/`);
        if (res.ok) { up = true; break; }
      } catch { /* retry */ }
      await wait(250);
    }
  }
  if (!up) throw new Error('preview did not start');
  const browser = await puppeteer.launch({
    executablePath: chrome,
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });
  for (const lang of ['es', 'en']) {
    const page = await browser.newPage();
    await page.setViewport({ width: 390, height: 800 });
    await page.goto(`http://127.0.0.1:${port}/${lang}`, { waitUntil: 'networkidle0' });
    let html = await page.content();
    if (!html.includes('<h1')) throw new Error(`empty render for /${lang}`);
    const site = String(process.env.VITE_SITE_URL || '').replace(/\/$/, '');
    html = html.replaceAll(`http://127.0.0.1:${port}`, site);
    await mkdir(`dist/${lang}`, { recursive: true });
    await writeFile(`dist/${lang}/index.html`, html);
    if (lang === 'es') await writeFile('dist/index.html', html);
    await page.close();
  }
  await browser.close();
  console.log('prerendered /es and /en');
} finally {
  preview?.kill('SIGTERM');
}
