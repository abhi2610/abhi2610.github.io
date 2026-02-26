// Konami code: ↑↑↓↓←→←→BA
function initKonami() {
  let buffer: string[] = [];
  const code = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  document.addEventListener('keydown', (e) => {
    buffer.push(e.key);
    if (buffer.length > code.length) buffer.shift();
    if (JSON.stringify(buffer) === JSON.stringify(code)) {
      document.body.style.transition = 'transform 0.5s ease';
      document.body.style.transform = 'rotate(360deg)';
      setTimeout(() => { document.body.style.transform = ''; }, 600);
      buffer = [];
    }
  });
}

// Double-click name → ☕ + drink (cycles wine/whiskey each time)
function initNameClick() {
  const name = document.getElementById('sidebarName') as HTMLElement | null;
  if (!name) return;
  const el = name; // TS narrows this to HTMLElement
  const base = 'Abhinav Shrivastava';
  const drinks = ['\ud83c\udf77', '\ud83e\udd43'];
  let drinkIdx = 0;
  let active = false;
  let clicks = 0;
  let clickTimer: ReturnType<typeof setTimeout> | null = null;
  let clearTimer: ReturnType<typeof setTimeout> | null = null;

  function activate() {
    active = true;
    el.style.whiteSpace = 'nowrap';
    el.style.transition = 'color 0.3s ease';
    el.style.color = '#a0522d';
    el.innerHTML = `<span style="font-size:0.55em;margin-right:6px">\u2615</span>${base}<span style="font-size:0.55em;margin-left:6px">${drinks[drinkIdx]}</span>`;
    drinkIdx = (drinkIdx + 1) % drinks.length;
    clearTimer = setTimeout(deactivate, 4000);
  }

  function deactivate() {
    active = false;
    el.innerHTML = base;
    el.style.color = '';
    el.style.whiteSpace = '';
    if (clearTimer) { clearTimeout(clearTimer); clearTimer = null; }
  }

  name.addEventListener('click', () => {
    clicks++;
    if (clickTimer) clearTimeout(clickTimer);
    clickTimer = setTimeout(() => { clicks = 0; }, 500);
    if (clicks >= 2) {
      clicks = 0;
      if (active) deactivate(); else activate();
    }
  });
}

// JS-assembled email — obfuscated DOM to resist scraping
function initEmail() {
  const el = document.getElementById('sidebarEmail');
  if (!el) return;
  const real = ['abhi', 'nav', '@', 'cs.', 'umd', '.edu'];
  const decoys = ['info', '.fake', '@', 'spam.', 'bot', '.net'];
  const addr = real.join('');

  function render() {
    el.innerHTML = '';
    real.forEach((chunk, i) => {
      // visible real chunk
      el.appendChild(document.createTextNode(chunk));
      // hidden decoy to poison scrapers
      if (i < decoys.length) {
        const trap = document.createElement('span');
        trap.textContent = decoys[i];
        trap.setAttribute('aria-hidden', 'true');
        trap.style.cssText = 'position:absolute;width:0;height:0;overflow:hidden;opacity:0;pointer-events:none';
        el.appendChild(trap);
      }
    });
  }

  render();
  el.addEventListener('click', () => {
    navigator.clipboard.writeText(addr).then(() => {
      el.textContent = 'copied!';
      el.classList.add('copied');
      setTimeout(() => {
        render();
        el.classList.remove('copied');
      }, 1500);
    });
  });
}

initKonami();
initNameClick();
initEmail();
document.addEventListener('astro:after-swap', () => {
  initNameClick();
  initEmail();
});
