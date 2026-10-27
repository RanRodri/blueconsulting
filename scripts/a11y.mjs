import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import axe from 'axe-core';
import puppeteer from 'puppeteer-core';

const chrome = [process.env.CHROME_PATH, '/usr/local/bin/google-chrome', '/usr/bin/google-chrome', '/usr/bin/chromium']
  .find((path) => path && existsSync(path));
const port = 4173;

function wait(ms) { return new Promise((resolve) => setTimeout(resolve, ms)); }

let preview = null;
try {
  let up = false;
  try { up = (await fetch(`http://127.0.0.1:${port}/es`)).ok; } catch { up = false; }
  if (!up) {
    preview = spawn('npx', ['vite', 'preview', '--host', '127.0.0.1', '--port', String(port), '--strictPort'], {
      stdio: 'ignore',
    });
    for (let i = 0; i < 40; i += 1) {
      try {
        const res = await fetch(`http://127.0.0.1:${port}/es`);
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
  const page = await browser.newPage();
  await page.goto(`http://127.0.0.1:${port}/es`, { waitUntil: 'networkidle0' });
  await page.addScriptTag({ content: axe.source });
  const result = await page.evaluate(async () => window.axe.run(document, {
    resultTypes: ['violations'],
  }));
  await browser.close();
  const serious = result.violations.filter((item) => item.impact === 'serious' || item.impact === 'critical');
  if (serious.length) {
    console.error(JSON.stringify(serious.map((item) => ({
      id: item.id,
      impact: item.impact,
      help: item.help,
      nodes: item.nodes.length,
    })), null, 2));
    process.exitCode = 1;
  } else {
    console.log(`axe: no serious or critical violations (${result.violations.length} other)`);
  }
} finally {
  preview?.kill('SIGTERM');
}
