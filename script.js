// ================================
// Embedded data
// ================================
const data = {
    fruits: [
        { name: "Gomu Gomu no Mi", rarity: "Legendary", description: "Rubber powers", image: "images/gomu.png" },
        { name: "Mera Mera no Mi", rarity: "Epic", description: "Fire powers", image: "images/mera.png" },
        // add all other fruits here
    ],
    swords: [
        { name: "Shusui", rarity: "Legendary", description: "Black blade", image: "images/shusui.png" },
        { name: "Wado Ichimonji", rarity: "Rare", description: "Famous katana", image: "images/wado.png" },
        // add other swords
    ],
    guns: [
        { name: "Flintlock", rarity: "Common", description: "Basic gun", image: "images/flintlock.png" },
        { name: "Musket", rarity: "Uncommon", description: "Advanced gun", image: "images/musket.png" },
    ],
    accessories: [
        { name: "Speed Bracelet", rarity: "Epic", description: "Boosts speed", image: "images/speed.png" },
        { name: "Power Ring", rarity: "Rare", description: "Increases strength", image: "images/power.png" },
    ]
};

// ================================
// Page setup
// ================================
const pageCategoryMap = {
    "fruits.html": "fruits",
    "swords.html": "swords",
    "guns.html": "guns",
    "accessories.html": "accessories"
};

const rarityColors = {
    "Common": "#9E9E9E",
    "Uncommon": "#1ECA00",
    "Rare": "#007BFF",
    "Epic": "#800080",
    "Legendary": "#FFD700",
    "Mythical": "#FF4500"
};

const rarityOrder = ["Common", "Uncommon", "Rare", "Epic", "Legendary", "Mythical"];
const currentPage = window.location.pathname.split("/").pop();
const category = pageCategoryMap[currentPage];
const container = document.getElementById("items-container");
const searchInput = document.getElementById("search");

// ================================
// Display items with wiki style
// ================================
function displayItems(items) {
    if (!container) return;
    container.innerHTML = "";
    items.forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item-card");
        itemDiv.style.borderColor = rarityColors[item.rarity] || "#000";

        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="item-image">
            <h3 class="item-name">${item.name}</h3>
            <p class="item-rarity" style="color:${rarityColors[item.rarity]}; font-weight:bold;">${item.rarity}</p>
            ${item.description ? `<p class="item-desc">${item.description}</p>` : ""}
        `;
        container.appendChild(itemDiv);
    });
}

// ================================
// Sort and search
// ================================
if (category && data[category]) {
    let items = data[category].sort((a, b) => rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity));
    displayItems(items);

    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const query = searchInput.value.toLowerCase();
            const filtered = items.filter(item => item.name.toLowerCase().includes(query));
            displayItems(filtered);
        });
    }
}

// ================================
// Homepage category links
// ================================
const categories = {
    "Fruits": "fruits.html",
    "Swords": "swords.html",
    "Guns": "guns.html",
    "Accessories": "accessories.html"
};

const linksContainer = document.getElementById("category-links");
if (linksContainer) {
    for (const [name, link] of Object.entries(categories)) {
        const a = document.createElement("a");
        a.href = link;
        a.textContent = name;
        a.classList.add("category-link");
        linksContainer.appendChild(a);
    }
}
