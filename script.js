// ------------------ GLOBAL MOCK DATA ------------------
// Comprehensive mock data for search and display functionality
const allItems = [
  // Fruits
  { id: 1, name: "Dragon", category: "Fruits", type: "Mythical", image_url: "https://via.placeholder.com/100?text=Dragon", price_money: 5000000, price_robux: 2500, description: "Legendary mythical zoan fruit with devastating fire abilities", rarity: "Legendary" },
  { id: 2, name: "Venom", category: "Fruits", type: "Natural", image_url: "https://via.placeholder.com/100?text=Venom", price_money: 4500000, price_robux: 2300, description: "Deadly poison-based fruit with area damage effects", rarity: "Legendary" },
  { id: 3, name: "Control", category: "Fruits", type: "Natural", image_url: "https://via.placeholder.com/100?text=Control", price_money: 4200000, price_robux: 2100, description: "Manipulate objects and enemies with telekinetic powers", rarity: "Legendary" },
  
  // Swords
  { id: 4, name: "Yama", category: "Swords", type: "Weapon", image_url: "https://via.placeholder.com/100?text=Yama", price_money: 3000000, price_robux: 0, description: "Legendary sword with exceptional range and damage", rarity: "Mythical" },
  { id: 5, name: "Tushita", category: "Swords", type: "Weapon", image_url: "https://via.placeholder.com/100?text=Tushita", price_money: 2800000, price_robux: 0, description: "Ancient blade with powerful aerial combos", rarity: "Mythical" },
  { id: 6, name: "Rengoku", category: "Swords", type: "Weapon", image_url: "https://via.placeholder.com/100?text=Rengoku", price_money: 1500000, price_robux: 0, description: "Flame-imbued sword with burning damage", rarity: "Legendary" },
  
  // Guns
  { id: 7, name: "Kabucha", category: "Guns", type: "Ranged", image_url: "https://via.placeholder.com/100?text=Kabucha", price_money: 1800000, price_robux: 0, description: "Powerful cannon with explosive projectiles", rarity: "Legendary" },
  { id: 8, name: "Acidum Rifle", category: "Guns", type: "Ranged", image_url: "https://via.placeholder.com/100?text=Acidum", price_money: 1500000, price_robux: 0, description: "Rifle that fires corrosive acid bullets", rarity: "Legendary" },
  
  // Fighting Styles
  { id: 9, name: "Godhuman", category: "FightingStyles", type: "Melee", image_url: "https://via.placeholder.com/100?text=Godhuman", description: "Ultimate fighting style combining multiple techniques", rarity: "Mythical" },
  { id: 10, name: "Electric Claw", category: "FightingStyles", type: "Melee", image_url: "https://via.placeholder.com/100?text=Electric", description: "Lightning-fast attacks with electric damage", rarity: "Legendary" },
  
  // Accessories
  { id: 11, name: "Dark Coat", category: "Accessories", type: "Accessory", image_url: "https://via.placeholder.com/100?text=DarkCoat", description: "Increases defense and provides style", rarity: "Rare" },
  { id: 12, name: "Ghoul Mask", category: "Accessories", type: "Accessory", image_url: "https://via.placeholder.com/100?text=GhoulMask", description: "Intimidating mask that boosts attack power", rarity: "Epic" },
  
  // Bosses & NPCs
  { id: 13, name: "Dough King", category: "Bosses", type: "Boss", image_url: "https://via.placeholder.com/100?text=DoughKing", description: "Powerful raid boss with dough-based abilities", rarity: "Raid Boss" },
  { id: 14, name: "Blox Fruit Dealer", category: "NPCs", type: "Vendor", image_url: "https://via.placeholder.com/100?text=Dealer", description: "Sells random fruits on rotation", location: "First Sea" }
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
  return /(fruits_pages|swords_pages|accessories_pages|guns_pages|styles_pages)\//.test(path) ? "../" : "";
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
  const existingHeader = document.querySelector('header');
  if (existingHeader) {
    existingHeader.outerHTML = headerHtml;
  } else if (document.body.firstElementChild) {
    document.body.insertAdjacentHTML('afterbegin', headerHtml);
  } else {
    document.body.innerHTML = headerHtml + (document.body.innerHTML || '');
  }

  // Replace or insert nav
  const existingNav = document.querySelector('nav');
  const headerEl = document.querySelector('header.site-header');
  if (existingNav) {
    // If nav exists, replace it. This handles all cases.
    existingNav.outerHTML = navHtml; 
  } else if (headerEl) {
    // If no nav exists, insert it after the header.
    headerEl.insertAdjacentHTML('afterend', navHtml);
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
      keys: ["name", "description", "category", "type", "rarity"],
      threshold: 0.3, // Slightly more strict matching
      includeScore: true,
      shouldSort: true,
      minMatchCharLength: 2
    });
  } else {
    // Enhanced fallback with weighted scoring
    fuse = {
      search: (q, opts) => {
        const s = String(q || '').trim().toLowerCase();
        if (!s) return [];
        
        // Calculate relevance score for better sorting
        const matches = allItems
          .map(item => {
            let score = 0;
            // Name match (highest priority)
            if ((item.name || '').toLowerCase().includes(s)) {
              score += 10;
              // Exact match or starts with gets higher score
              if ((item.name || '').toLowerCase() === s) score += 5;
              if ((item.name || '').toLowerCase().startsWith(s)) score += 3;
            }
            // Category match
            if ((item.category || '').toLowerCase().includes(s)) score += 5;
            // Type match
            if ((item.type || '').toLowerCase().includes(s)) score += 4;
            // Description match (lowest priority)
            if ((item.description || '').toLowerCase().includes(s)) score += 2;
            // Rarity match
            if ((item.rarity || '').toLowerCase().includes(s)) score += 3;
            
            return { item, score };
          })
          .filter(result => result.score > 0)
          .sort((a, b) => b.score - a.score);
          
        return matches.map(match => ({ item: match.item, score: match.score }));
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
    
    // Add header with result count and close button
    const header = document.createElement("div");
    header.className = "search-header";
    header.innerHTML = `
      <span>${results.length} result${results.length > 1 ? 's' : ''} found</span>
      <button class="close-search" aria-label="Close search results">×</button>
    `;
    searchResults.appendChild(header);
    
    // Add results container
    const resultsContainer = document.createElement("div");
    resultsContainer.className = "search-results-content";
    searchResults.appendChild(resultsContainer);
    
    results.forEach((r, i) => {
      const item = r.item || r;
      const card = document.createElement("div");
      card.className = "result-card";
      card.dataset.index = i;
      card.setAttribute("tabindex", "0"); // Make focusable for keyboard navigation
      
      // Format price if available
      const priceDisplay = item.price_money ? 
        `<span class="result-price">${Number(item.price_money).toLocaleString()} $</span>` : '';
      
      // Show rarity badge if available
      const rarityBadge = item.rarity ? 
        `<span class="rarity-badge ${(item.rarity || '').toLowerCase()}">${item.rarity}</span>` : '';
      
      card.innerHTML = `
        <img src="${safeText(item.image_url) || getPlaceholderImage(item.category)}" 
             alt="${safeText(item.name)}" 
             loading="lazy" 
             onerror="this.onerror=null;this.src='${getPlaceholderImage(item.category)}'"/>
        <div class="meta">
          <div class="result-header">
            <h3>${safeText(item.name)}</h3>
            ${rarityBadge}
          </div>
          <p>${safeText(item.category)} • ${safeText(item.type)}</p>
          <p>${safeText(item.description || "").substring(0, 70)}${(item.description || "").length > 70 ? '...' : ''}</p>
          ${priceDisplay}
        </div>
      `;
      
      card.addEventListener("click", () => {
        navigateToItem(item);
      });
      
      // Add keyboard accessibility
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          navigateToItem(item);
        }
      });
      
      resultsContainer.appendChild(card);
    });
    
    searchResults.classList.add("active");
    selectedIndex = -1;
    
    // Add click event to close button
    const closeButton = searchResults.querySelector('.close-search');
    if (closeButton) {
      closeButton.addEventListener('click', () => {
        searchResults.classList.remove("active");
      });
    }
    
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
    
    if (results.length === 0) {
      searchResults.innerHTML = `
        <div class="search-header">
          <span>No results found</span>
          <button class="close-search" aria-label="Close search results">×</button>
        </div>
        <div class="no-results">
          <p>No items match your search for "${query}"</p>
          <p>Try using different keywords or check for typos</p>
        </div>
      `;
      searchResults.classList.add("active");
      
      // Add click event to close button
      const closeButton = searchResults.querySelector('.close-search');
      if (closeButton) {
        closeButton.addEventListener('click', () => {
          searchResults.classList.remove("active");
        });
      }
      return;
    }
    
    renderSearchResults(results);
  }

  function navigateToItem(item) {
    // Enhanced navigation with better URL handling
    const pageMap = {
      "Fruits": "fruits.html",
      "Swords": "swords.html",
      "Guns": "guns.html",
      "FightingStyles": "styles.html",
      "Accessories": "accessories.html",
      "Bosses": "bosses.html",
      "Islands": "islands.html",
      "NPCs": "npcs.html"
    };
    
    // Create URL-safe slug from item name
    const itemNameSlug = item.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
    
    // Determine if we should navigate to detail page or category page
    let targetPage = '';
    switch(item.category) {
      case "Fruits":
        targetPage = `${getBasePrefix()}fruits_pages/${itemNameSlug}.html`;
        break;
      case "Swords":
        targetPage = `${getBasePrefix()}swords_pages/${itemNameSlug}.html`;
        break;
      case "Guns":
        targetPage = `${getBasePrefix()}guns_pages/${itemNameSlug}.html`;
        break;
      case "FightingStyles":
        targetPage = `${getBasePrefix()}styles_pages/${itemNameSlug}.html`;
        break;
      case "Accessories":
        targetPage = `${getBasePrefix()}accessories_pages/${itemNameSlug}.html`;
        break;
      default:
        targetPage = `${getBasePrefix()}${pageMap[item.category] || "index.html"}`;
    }
    
    window.location.href = targetPage;
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
