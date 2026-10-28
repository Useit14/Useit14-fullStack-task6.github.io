const btn = document.querySelector('.page-header__navicon');
const dropdown = document.querySelector('.dropdown');
if (btn && dropdown) {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('is-open');
  });
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && !btn.contains(e.target)) {
      dropdown.classList.remove('is-open');
    }
  });
}

(function () {
  function show(label, value) {
    const el = document.getElementById('perf-' + label);
    if (el) el.textContent = value + ' ms';
    console.log(label + ':', value, 'ms');
  }
  function fromNav() {
    if (!performance.getEntriesByType) return null;
    const nav = performance.getEntriesByType('navigation')[0];
    if (!nav) return null;
    return {
      dom: Math.round(nav.domContentLoadedEventEnd * 100) / 100,
      load: Math.round(nav.loadEventEnd * 100) / 100
    };
  }
  document.addEventListener('DOMContentLoaded', function () {
    const n = fromNav();
    show('dom', n ? n.dom : Math.round(performance.now() * 100) / 100);
  });
  window.addEventListener('load', function () {
    const n = fromNav();
    show('load', n ? n.load : Math.round(performance.now() * 100) / 100);
    if (n) show('dom', n.dom);
  });
})();
