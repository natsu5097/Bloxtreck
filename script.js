/* Consolidated site script
   - Renders fruitsData into #fruits-sections
   - Provides search using Fuse.js when available, falls back to simple substring search
   - Collapsible sections, lazy image loading, dark mode toggle, scroll-to-top
*/

const App = (() => {
  const placeholder = 'fruits_pages/images/placeholder.svg';
  const inlineFallback = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAAQCAYAAAB49l3hAAAAJ0lEQVR42u3BMQEAAADCoPVPbQhPoAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwG4kAAc4b0/8AAAAASUVORK5CYII=';

  // Keep a simple, editable dataset here. You can later fetch JSON from the server.
  const fruitsData = {
    Common: [
      { name: "Rocket", desc: "Rocket is a common fruit used for fast attacks.", img: "fruits_pages/images/rocket.png", link: "fruits_pages/rocket.html" },
      { name: "Spin", desc: "Spin fruit allows you to spin attacks.", img: "fruits_pages/images/spin.png", link: "fruits_pages/spin.html" },
      { name: "Blade", desc: "Blade fruit enhances your sword skills.", img: "fruits_pages/images/blade.png", link: "fruits_pages/blade.html" }
    ],
    Rare: [
      { name: "Creation", desc: "Creation fruit lets you create objects.", img: "fruits_pages/images/creation.png", link: "fruits_pages/creation.html" },
      { name: "Phoenix", desc: "Phoenix fruit grants rebirth abilities.", img: "fruits_pages/images/phoenix.png", link: "fruits_pages/phoenix.html" }
    ],
    Mythical: [
      { name: "Dragon", desc: "Dragon fruit gives you dragon powers.", img: "fruits_pages/images/dragon.png", link: "fruits_pages/dragon.html" }
    ]
  };

  const safeText = v => (v === undefined || v === null ? "" : String(v));

  // Render collapsible sections with cards
  function renderAll() {
    const container = document.getElementById('fruits-sections');
    if (!container) return;
    container.innerHTML = '';

    Object.keys(fruitsData).forEach(rarity => {
      const section = document.createElement('section');
      section.className = 'collapsible-section';

      const header = document.createElement('h3');
      header.className = 'collapsible-header';
      header.textContent = `${rarity} (${fruitsData[rarity].length})`;

      const content = document.createElement('div');
      content.className = 'collapsible-content';

      fruitsData[rarity].forEach(fruit => {
        const card = document.createElement('div');
        card.className = 'category-card';
        const imgSrc = safeText(fruit.img) || placeholder;
        card.innerHTML = `
          <img data-src="${imgSrc}" alt="${fruit.name}" loading="lazy" class="card-img" style="width:48px;height:48px;object-fit:contain"/>
          <h3><a href="${fruit.link}">${fruit.name}</a></h3>
          <p>${fruit.desc}</p>
        `;
        content.appendChild(card);
      });

      section.appendChild(header);
      section.appendChild(content);
      container.appendChild(section);

      header.addEventListener('click', () => {
        header.classList.toggle('active');
        content.classList.toggle('active');
      });
    });

    lazyLoadImages(container);
  }

  function lazyLoadImages(root) {
    const imgs = root.querySelectorAll('img[data-src]');
    if (!imgs.length) return;
    const obs = new IntersectionObserver((entries, o) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const img = e.target;
          img.src = img.getAttribute('data-src') || placeholder;
          img.removeAttribute('data-src');
          img.onerror = () => { img.src = inlineFallback; };
          o.unobserve(img);
        }
      });
    }, { rootMargin: '100px' });
    imgs.forEach(i => obs.observe(i));
  }

  // Search: use Fuse if available, otherwise substring match
  function search(query) {
    if (!query) return [];
    const hay = Object.values(fruitsData).flat();
    if (window.Fuse) {
      const fuse = new Fuse(hay, { keys: ['name', 'desc'], threshold: 0.35 });
      return fuse.search(query).map(r => r.item);
    }
    const q = query.toLowerCase();
    return hay.filter(f => (f.name && f.name.toLowerCase().includes(q)) || (f.desc && f.desc.toLowerCase().includes(q)));
  }

  function renderSearchResults(results) {
    const container = document.getElementById('search-results');
    const clearBtn = document.getElementById('clear-search');
    if (!container) return;
    container.innerHTML = '';
    results.forEach(fruit => {
      const card = document.createElement('div');
      card.className = 'result-card';
      card.innerHTML = `
        <img src="${safeText(fruit.img) || placeholder}" alt="${fruit.name}" loading="lazy" onerror="this.onerror=null;this.src='${inlineFallback}'"/>
        <div class="meta">
          <a href="${fruit.link}"><h3>${fruit.name}</h3></a>
          <p>${fruit.desc}</p>
        </div>
      `;
      container.appendChild(card);
    });
    container.classList.toggle('active', results.length > 0);
    if (clearBtn) clearBtn.style.display = results.length ? 'inline-block' : 'none';
  }

  function initUI() {
    const searchBox = document.getElementById('search-box');
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const darkToggle = document.getElementById('darkModeToggle');
    const clearBtn = document.getElementById('clear-search');

    if (searchBox) {
      searchBox.addEventListener('input', e => {
        const q = (e.target.value || '').trim();
        if (!q) return renderSearchResults([]);
        renderSearchResults(search(q));
      });
    }

    if (clearBtn) clearBtn.addEventListener('click', () => { const sb = document.getElementById('search-box'); if (sb) sb.value = ''; renderSearchResults([]); });

    if (scrollTopBtn) {
      window.addEventListener('scroll', () => { scrollTopBtn.style.display = window.scrollY > 200 ? 'block' : 'none'; });
      scrollTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    if (darkToggle) {
      const icon = darkToggle.querySelector('.icon');
      if (localStorage.getItem('theme') === 'dark') { document.body.classList.add('dark'); if (icon) icon.textContent = '☀️'; }
      darkToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        if (document.body.classList.contains('dark')) { localStorage.setItem('theme', 'dark'); if (icon) icon.textContent = '☀️'; }
        else { localStorage.setItem('theme', 'light'); if (icon) icon.textContent = '🌙'; }
      });
    }
  }

  function start() {
    renderAll();
    initUI();
  }

  return { start };
})();

document.addEventListener('DOMContentLoaded', () => App.start());
