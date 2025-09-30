// ------------------ GLOBAL MOCK DATA ------------------
// Move sample/mock data to top-level so it can be reused by other functions
const allItems = [
  { id: 1, name: "Dragon", category: "Fruits", type: "Mythical", image_url: "", price_money: 5000, price_robux: 50, description: "Legendary fruit" },
  { id: 2, name: "Blade", category: "Swords", type: "Weapon", image_url: "", price_money: 3000, price_robux: 30, description: "Sharp sword" },
  { id: 3, name: "Pistol", category: "Guns", type: "Ranged", image_url: "", price_money: 2500, price_robux: 25, description: "Basic gun" },
  { id: 4, name: "Karate", category: "FightingStyles", type: "Melee", image_url: "", description: "Martial art" },
  { id: 5, name: "Ring", category: "Accessories", type: "Accessory", image_url: "", description: "Increases strength" },
  { id: 6, name: "Marine Captain", category: "Bosses", type: "Boss", image_url: "", description: "Sea-based boss" },
  { id: 7, name: "Starter Island", category: "Islands", type: "Island", image_url: "", description: "Beginning area" },
  { id: 8, name: "Black Leg", category: "FightingStyles", type: "Melee", image_url: "", description: "Powerful kicking style" }
];


document.addEventListener("DOMContentLoaded", () => {
  // Build global header/nav/footer first so controls exist across all pages
  renderGlobalChrome();

  // Ensure head has title and favicon
  ensureHeadMeta();

  // Initialize all components
  initializeDarkMode();
  initializeSearch();
  initializeScrollTop();
  initializeCollapsibles();
  loadPageContent();
});

// ================= GLOBAL CHROME (Header/Nav/Footer) =================
function getBasePrefix() {
  const path = window.location.pathname.replace(/\\\\/g, "/");
  // If inside a subfolder like fruits_pages/, swords_pages/, or accessories_pages/ use ../ links
  return /(fruits_pages|swords_pages|accessories_pages|guns_pages)\//.test(path) ? "../" : "";
}

function renderGlobalChrome() {
  const base = getBasePrefix();

  // Remove any pre-existing duplicate search results containers to avoid ID conflicts
  document.querySelectorAll('#search-results').forEach(el => el.remove());

  const headerHtml = `
<header class="site-header">
  <div class="logo-title">
    <a href="${base}index.html">
      <img src="${base}images/sitelogo/bloxtrex.png" alt="Blox Fruits Wiki Logo" class="site-logo">
    </a>
    <h1><a href="${base}index.html" style="color:inherit; text-decoration:none;">Blox Fruits Fan Wiki</a></h1>
  </div>
  <div class="header-controls">
    <div class="search-wrapper">
      <input type="text" id="search-box" placeholder="Search items..." aria-label="Search items">
      <div id="search-results" class="search-results"></div>
    </div>
    <button id="darkModeToggle" title="Toggle dark mode"><span class="icon">🌙</span></button>
  </div>
</header>`;

  const navHtml = `
<nav>
  <a href="${base}index.html">Home</a>
  <a href="${base}fruits.html">Fruits</a>
  <a href="${base}swords.html">Swords</a>
  <a href="${base}guns.html">Guns</a>
  <a href="${base}styles.html">Fighting Styles</a>
  <a href="${base}accessories.html">Accessories</a>
  <a href="${base}islands.html">Islands</a>
  <a href="${base}bosses.html">Bosses</a>
  <a href="${base}npcs.html">NPCs</a>
</nav>`;

  const footerHtml = `
<footer>
  <p>Fan-made Blox Fruits Wiki &copy; Natsu</p>
</footer>`;

  // Replace or insert header
  const existingHeader = document.querySelector('header.site-header');
  if (existingHeader) {
    existingHeader.outerHTML = headerHtml;
  } else if (document.body.firstElementChild) {
    document.body.insertAdjacentHTML('afterbegin', headerHtml);
  } else {
    document.body.innerHTML = headerHtml + document.body.innerHTML;
  }

  // Replace or insert nav
  const existingNav = document.querySelector('nav');
  const headerEl = document.querySelector('header.site-header');
  if (existingNav) {
    existingNav.outerHTML = navHtml;
  } else if (headerEl) {
    headerEl.insertAdjacentHTML('afterend', navHtml);
  } else {
    document.body.insertAdjacentHTML('afterbegin', navHtml);
  }

  // Replace or insert footer
  const existingFooter = document.querySelector('footer');
  if (existingFooter) {
    existingFooter.outerHTML = footerHtml;
  } else {
    document.body.insertAdjacentHTML('beforeend', footerHtml);
  }

  // Ensure a single scroll-to-top button exists
  const existingBtns = document.querySelectorAll('#scrollTopBtn');
  existingBtns.forEach((btn, idx) => { if (idx > 0) btn.remove(); });
  if (!document.getElementById('scrollTopBtn')) {
    const btn = document.createElement('button');
    btn.id = 'scrollTopBtn';
    btn.className = 'scroll-top-btn';
    btn.textContent = '⬆️ Top';
    document.body.appendChild(btn);
  }
}

// ================= HEAD META (Title + Favicon) =================
function ensureHeadMeta() {
  const head = document.head || document.getElementsByTagName('head')[0];
  if (!head) return;

  const base = getBasePrefix();
  const desiredIconHref = `${base}images/sitelogo/bloxtrex.png`;

  // Favicon: add or enforce
  let iconLink = head.querySelector('link[rel="icon"]');
  if (!iconLink) {
    iconLink = document.createElement('link');
    iconLink.setAttribute('rel', 'icon');
    iconLink.setAttribute('type', 'image/png');
    head.appendChild(iconLink);
  }
  iconLink.setAttribute('href', desiredIconHref);

  // Title: ensure there is a meaningful title and brand suffix
  const brand = 'Blox Fruits Fan Wiki';
  const title = document.title || '';
  const hasBrand = /Blox\s*Fruits|Bloxtreck|BloxTreck/i.test(title);

  function derivePageName() {
    const candidate = document.querySelector('main h1, main h2, .blox-fruits-info h2, .logo-title h1');
    return candidate ? candidate.textContent.trim() : '';
  }

  if (!title || /^\s*$/.test(title) || /^Document$/i.test(title)) {
    const name = derivePageName();
    document.title = name ? `${name} — ${brand}` : brand;
  } else if (!hasBrand) {
    document.title = `${title} — ${brand}`;
  }
}

// ================= DARK MODE =================
function initializeDarkMode() {
  // support either ID used across pages: darkModeToggle or darkToggle
  const darkToggle = document.getElementById("darkModeToggle") || document.getElementById("darkToggle");
  if (!darkToggle) return;

  const icon = darkToggle.querySelector(".icon");
  const currentTheme = localStorage.getItem("theme") || "light";
  
  if (currentTheme === "dark") {
    document.body.classList.add("dark");
    if (icon) icon.textContent = "☀️";
  }

  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");
    
    if (isDark) {
      localStorage.setItem("theme", "dark");
      if (icon) icon.textContent = "☀️";
    } else {
      localStorage.setItem("theme", "light");
      if (icon) icon.textContent = "🌙";
    }
  });
}

// ================= SEARCH FUNCTIONALITY =================
function initializeSearch() {
  // accept inputs like <input id="search-box"> or inputs named search-*
  const searchInputs = document.querySelectorAll('input[id*="search"]');
  const searchResults = document.getElementById("search-results");
  const clearSearchBtn = document.getElementById("clear-search");
  
  if (!searchInputs.length) return;

  // Initialize Fuse.js for fuzzy search if available, otherwise create a tiny fallback
  let fuse = null;
  if (typeof Fuse === 'function') {
    fuse = new Fuse(allItems, {
      keys: ["name", "description", "category", "type"],
      threshold: 0.35,
      includeScore: true
    });
  } else {
    // fallback - simple substring matcher wrapped to emulate Fuse result shape
    fuse = {
      search: (q, opts) => {
        const s = String(q || '').trim().toLowerCase();
        if (!s) return [];
        const matches = allItems.filter(item => (
          (item.name || '').toLowerCase().includes(s) ||
          (item.description || '').toLowerCase().includes(s) ||
          (item.category || '').toLowerCase().includes(s) ||
          (item.type || '').toLowerCase().includes(s)
        ));
        return matches.map(item => ({ item }));
      }
    };
  }

  let selectedIndex = -1;

  function renderSearchResults(results) {
    if (!searchResults) return;
    searchResults.innerHTML = "";
    
    if (!results || results.length === 0) {
      searchResults.classList.remove("active");
      return;
    }
    
    results.forEach((r, i) => {
      const item = r.item || r;
      const card = document.createElement("div");
      card.className = "result-card";
      card.dataset.index = i;
      card.innerHTML = `
        <img src="${safeText(item.image_url) || getPlaceholderImage(item.category)}" 
             alt="${safeText(item.name)}" 
             loading="lazy" 
             onerror="this.onerror=null;this.src='${getPlaceholderImage(item.category)}'"/>
        <div class="meta">
          <h3>${safeText(item.name)}</h3>
          <p>${safeText(item.category)} • ${safeText(item.type)}</p>
          <p>${safeText(item.description || "")}</p>
        </div>
      `;
      card.addEventListener("click", () => {
        // Navigate to the appropriate page based on category
        navigateToItem(item);
      });
      searchResults.appendChild(card);
    });
    
    searchResults.classList.add("active");
    selectedIndex = -1;
    
    if (clearSearchBtn) {
      clearSearchBtn.style.display = "block";
    }
  }

  function performSearch(query) {
    if (!searchResults) return;
    if (!query || !String(query).trim()) {
      searchResults.classList.remove("active");
      if (clearSearchBtn) clearSearchBtn.style.display = "none";
      return;
    }
    
    const results = fuse.search(query, { limit: 20 });
    renderSearchResults(results);
  }

  function navigateToItem(item) {
    // Simple navigation - in a real app, you'd have proper routing
    const pageMap = {
      "Fruits": "fruits.html",
      "Swords": "swords.html",
      "Guns": "guns.html",
      "FightingStyles": "styles.html",
      "Accessories": "accessories.html",
      "Bosses": "bosses.html",
      "Islands": "islands.html"
    };
    
    const page = pageMap[item.category] || "index.html";
    const base = getBasePrefix();
    window.location.href = base + page;
  }

  // Add event listeners to all search inputs
  searchInputs.forEach(input => {
    input.addEventListener("input", (e) => {
      performSearch(e.target.value);
    });
    
    input.addEventListener("keydown", (e) => {
      const cards = searchResults ? searchResults.querySelectorAll(".result-card") : [];
      if (!cards.length) return;

      if (e.key === "ArrowDown") {
        selectedIndex = (selectedIndex + 1) % cards.length;
        updateSelectedCard(cards);
        e.preventDefault();
      } else if (e.key === "ArrowUp") {
        selectedIndex = (selectedIndex - 1 + cards.length) % cards.length;
        updateSelectedCard(cards);
        e.preventDefault();
      } else if (e.key === "Enter" && selectedIndex >= 0) {
        cards[selectedIndex].click();
      } else if (e.key === "Escape") {
        if (searchResults) searchResults.classList.remove("active");
        input.value = "";
        selectedIndex = -1;
      }
    });
    
    // Close search results when clicking outside
    document.addEventListener("click", (e) => {
      if (!searchResults) return;
      if (!searchResults.contains(e.target) && !input.contains(e.target)) {
        searchResults.classList.remove("active");
      }
    });
  });

  function updateSelectedCard(cards) {
    cards.forEach(c => c.classList.remove("selected"));
    if (selectedIndex >= 0) {
      cards[selectedIndex].classList.add("selected");
      cards[selectedIndex].scrollIntoView({ block: "nearest" });
    }
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener("click", () => {
      searchInputs.forEach(input => input.value = "");
      if (searchResults) searchResults.classList.remove("active");
      clearSearchBtn.style.display = "none";
      selectedIndex = -1;
    });
  }
}

// ================= SCROLL TO TOP =================
function initializeScrollTop() {
  const scrollTopBtn = document.getElementById("scrollTopBtn");
  if (!scrollTopBtn) return;

  window.addEventListener("scroll", () => {
    scrollTopBtn.style.display = window.scrollY > 200 ? "block" : "none";
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// ================= COLLAPSIBLE SECTIONS =================
function initializeCollapsibles() {
  const collapsibleHeaders = document.querySelectorAll(".collapsible-header");
  
  collapsibleHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      if (!content) return;
      const isActive = content.classList.contains("active");
      
      // Close all other sections if this is being opened
      if (!isActive) {
        document.querySelectorAll(".collapsible-content.active").forEach(activeContent => {
          if (activeContent !== content) {
            activeContent.classList.remove("active");
            if (activeContent.previousElementSibling) activeContent.previousElementSibling.classList.remove("active");
          }
        });
      }
      
      content.classList.toggle("active");
      header.classList.toggle("active");
    });
  });
}

// ================= PAGE CONTENT LOADING =================
function loadPageContent() {
  const path = window.location.pathname;
  const page = path.split("/").pop() || "index.html";
  
  // Set active nav link
  setActiveNavLink(page);
  
  // Load content based on page
  if (page === "index.html" || page === "" || page === "/") {
    loadHomePage();
  } else {
    loadCategoryPage(page);
  }
}

function setActiveNavLink(currentPage) {
  const navLinks = document.querySelectorAll("nav a");
  const normalize = (p) => String(p || "").split("/").pop();
  const current = normalize(currentPage);
  
  navLinks.forEach(link => {
    link.classList.remove("active");
    const linkPage = normalize(link.getAttribute("href"));
    if (linkPage === current) {
      link.classList.add("active");
    }
  });
}

function loadHomePage() {
  // Home page specific initialization
  // console.log("Loading home page content");
}

function loadCategoryPage(page) {
  const containerMap = {
    "fruits.html": "fruits-sections",
    "swords.html": "swords-container", 
    "guns.html": "guns-container",
    "styles.html": "styles-container",
    "accessories.html": "accessories-container",
    "islands.html": "islands-container",
    "bosses.html": "bosses-container",
    "npcs.html": "npcs-container"
  };
  
  const containerId = containerMap[page];
  if (!containerId) return;
  
  const container = document.getElementById(containerId);
  if (!container) return;
  
  // In a real app, you would fetch data from an API or JSON file
  // For now, we'll use mock data
  const mockData = generateMockDataForPage(page);
  renderItemsGrid(mockData, container);
}

function generateMockDataForPage(page) {
  // Filter the allItems array by category
  const categoryMap = {
    "fruits.html": "Fruits",
    "swords.html": "Swords", 
    "guns.html": "Guns",
    "styles.html": "FightingStyles",
    "accessories.html": "Accessories",
    "islands.html": "Islands",
    "bosses.html": "Bosses",
    "npcs.html": "NPCs"
  };
  
  const category = categoryMap[page];
  if (!category) {
    return [
      { name: "Sample Item", type: "Type", image_url: "", price_money: 1000, description: "Sample description" }
    ];
  }
  return allItems.filter(item => item.category === category);
}

function renderItemsGrid(items, container) {
  container.innerHTML = "";
  
  items.forEach(item => {
    const card = document.createElement("div");
    card.className = "item-card";
    card.innerHTML = `
      <img src="${safeText(item.image_url) || getPlaceholderImage()}" 
           alt="${safeText(item.name)}"
           onerror="this.onerror=null;this.src='${getPlaceholderImage()}'">
      <h3>${safeText(item.name)}</h3>
      <p>Type: ${safeText(item.type)}</p>
      ${item.price_money ? `<p>Price: $${Number(item.price_money).toLocaleString()}</p>` : ''}
      <p>${safeText(item.description)}</p>
    `;
    container.appendChild(card);
  });
}

// ================= UTILITY FUNCTIONS =================
function safeText(value) {
  return (value === undefined || value === null) ? "" : String(value);
}

function getPlaceholderImage(category = "") {
  // In a real app, you would have actual placeholder images
  return "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBmaWxsPSIjZDNlM2ZmIi8+CjxwYXRoIGQ9Ik01MCAzMEM1My44MTM3IDMwIDU3IDMzLjE4NjMgNTcgMzdDNTcgNDAuODEzNyA1My44MTM3IDQ0IDUwIDQ0QzQ2LjE4NjMgNDQgNDMgNDAuODEzNyA0MyAzN0M0MyAzMy4xODYzIDQ2LjE4NjMgMzAgNTAgMzBaIiBmaWxsPSIjNzE5MWZmIi8+CjxwYXRoIGQ9Ik0zNSA2NUMzNSA2NSAzNSA2MCAzNSA1NUMzNSA1MCA0MCA0MCA1MCA0MEM2MCA0MCA2NSA1MCA2NSA1NUM2NSA2MCA2NSA2NSAzNSA2NVoiIGZpbGw9IiM3MTkxZmYiLz4KPC9zdmc+Cg==";
}
