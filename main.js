// Configuration
const CONFIG = {
  defaultHash: "#home",
};

const DEFAULT_HASH = CONFIG.defaultHash;
const CANVAS = document.getElementById('canvas');

// Navigation
function changeTab(newTab) {
  document.querySelectorAll('.tab-switcher').forEach((element) => {
    element.classList.remove('tab-active');
  });

  document.querySelectorAll('.tabs').forEach((section) => {
    section.style.display = 'none';
  });

  try {
    document.getElementById(newTab + '-tab').classList.add('tab-active');

    const targetSection = document.getElementById(newTab);

    if (targetSection) {
      targetSection.style.display = 'block';
    }
  } catch (error) {
    defaultHash();
  }
}

// Routing
function routing(hash) {
  const cleanHash = hash || DEFAULT_HASH;
  const [route, query] = cleanHash.slice(1).split('?');

  changeTab(route);
}

function defaultHash() {
  history.replaceState(null, null, DEFAULT_HASH);
  routing(DEFAULT_HASH);
}

function initRouting() {
  window.addEventListener('popstate', () => {
    routing(location.hash);
  });

  routing(location.hash || DEFAULT_HASH);
}

// Initialization
document.body.classList.add('no-fouc');
document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.remove('no-fouc');

  document.querySelectorAll('.tab-switcher').forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();

      const targetHash = tab.getAttribute('href');

      history.pushState(null, null, targetHash);

      routing(targetHash);
    });
  });

  initRouting();
});
