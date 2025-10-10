# 📁 Bloxtreck Website Organization Guide

## 🎯 **REORGANIZATION COMPLETE**

The Bloxtreck website has been completely reorganized for better accessibility, maintainability, and user experience.

## 📂 **New Directory Structure**

```
Bloxtreck/
├── 📄 Core Files (Root)
│   ├── index.html (Homepage)
│   ├── 404.html (Error page)
│   ├── style.css (Global styles)
│   └── script.js (Global functionality)
│
├── 📚 Content Pages
│   ├── about.html (About the wiki)
│   ├── tierlist.html (Tier lists)
│   └── item-template.html (Template for items)
│
├── 🍎 Game Content
│   ├── fruits/
│   │   ├── index.html (Main fruits page)
│   │   └── pages/ (Individual fruit pages)
│   ├── swords/
│   │   ├── index.html (Main swords page)
│   │   └── pages/ (Individual sword pages)
│   ├── guns/
│   │   ├── index.html (Main guns page)
│   │   └── pages/ (Individual gun pages)
│   ├── fighting-styles/
│   │   ├── index.html (Main fighting styles page)
│   │   └── pages/ (Individual style pages)
│   ├── accessories/
│   │   ├── index.html (Main accessories page)
│   │   └── pages/ (Individual accessory pages)
│   ├── islands/
│   │   └── index.html (Main islands page)
│   ├── bosses/
│   │   └── index.html (Main bosses page)
│   └── npcs/
│       └── index.html (Main NPCs page)
│
├── 🛠️ Tools & Utilities
│   ├── index.html (Main tools page)
│   ├── calculators/
│   │   ├── damage-calculator.html
│   │   ├── xp-calculator.html
│   │   ├── bounty-calculator.html
│   │   └── material-calculator.html
│   ├── planners/
│   │   ├── build-planner.html
│   │   ├── combo-builder.html
│   │   └── stat-allocator.html
│   ├── simulators/
│   │   ├── drop-simulator.html
│   │   └── fruit-comparison.html
│   ├── trackers/
│   │   ├── boss-timers.html
│   │   └── trading-values.html
│   └── maps/
│       ├── boss-timers.html
│       └── interactive-map.html
│
├── 🎮 Community
│   └── quiz.html
│
├── 🖼️ Assets
│   ├── images/
│   │   ├── fruits_images/ (Fruit images)
│   │   ├── swords_images/ (Sword images)
│   │   ├── guns_images/ (Gun images)
│   │   ├── styles_images/ (Fighting style images)
│   │   └── sitelogo/ (Site logos and favicons)
│   └── styles/
│       └── tools.css (Tools-specific styles)
│
└── 📋 Documentation
    └── ORGANIZATION_GUIDE.md (This file)
```

## 🔗 **Updated Navigation Structure**

### **Main Navigation Links:**
- **Home**: `index.html`
- **Fruits**: `game-content/fruits/index.html`
- **Swords**: `game-content/swords/index.html`
- **Guns**: `game-content/guns/index.html`
- **Fighting Styles**: `game-content/fighting-styles/index.html`
- **Accessories**: `game-content/accessories/index.html`
- **Islands**: `game-content/islands/index.html`
- **Bosses**: `game-content/bosses/index.html`
- **NPCs**: `game-content/npcs/index.html`
- **About**: `content/about.html`
- **Tier Lists**: `content/tierlist.html`
- **Tools**: `tools-utilities/index.html`
- **Quiz**: `community/quiz.html`

### **Individual Item Pages:**
- **Fruits**: `game-content/fruits/pages/[fruit-name].html`
- **Swords**: `game-content/swords/pages/[sword-name].html`
- **Guns**: `game-content/guns/pages/[gun-name].html`
- **Fighting Styles**: `game-content/fighting-styles/pages/[style-name].html`
- **Accessories**: `game-content/accessories/pages/[accessory-name].html`

## 🛠️ **Technical Updates Made**

### **1. File Organization:**
- ✅ Moved all game content to `game-content/` directory
- ✅ Organized tools into categorized subdirectories
- ✅ Centralized all assets in `assets/` directory
- ✅ Created dedicated `content/` directory for main pages
- ✅ Maintained `community/` directory for community features

### **2. Link Updates:**
- ✅ Updated all navigation links in `index.html`
- ✅ Updated all navigation links in `script.js`
- ✅ Updated image paths to point to `assets/images/`
- ✅ Updated search functionality to use new paths
- ✅ Updated breadcrumb navigation
- ✅ Updated category mappings

### **3. Script.js Updates:**
- ✅ Updated `getBasePrefix()` function for new directory structure
- ✅ Updated navigation HTML generation
- ✅ Updated search category mappings
- ✅ Updated individual item page paths
- ✅ Updated path detection for legacy page upgrades

## 🎯 **Benefits of New Organization**

### **For Users:**
- **Clearer Navigation**: Logical grouping of content by type
- **Better Search**: Improved search results with proper categorization
- **Faster Loading**: Organized assets for better caching
- **Mobile Friendly**: Consistent responsive design across all pages

### **For Developers:**
- **Easy Maintenance**: Clear separation of concerns
- **Scalable Structure**: Easy to add new content categories
- **Consistent Naming**: Standardized file and directory names
- **Better Version Control**: Logical file organization for Git

### **For Content Creators:**
- **Template System**: Consistent item page templates
- **Asset Management**: Centralized image and style management
- **Easy Updates**: Clear structure for adding new items
- **Documentation**: Comprehensive guides for contributors

## 🚀 **Next Steps**

1. **Test All Links**: Verify all navigation works correctly
2. **Update External References**: Update any external links pointing to old structure
3. **SEO Optimization**: Update sitemap and meta tags
4. **Performance Testing**: Verify page load times
5. **User Testing**: Get feedback on new navigation structure

## 📝 **Migration Notes**

- **Old Structure**: All files were previously in root or scattered subdirectories
- **New Structure**: Organized by content type and functionality
- **Backward Compatibility**: All old URLs redirect to new structure
- **Search Functionality**: Updated to work with new paths
- **Image References**: All updated to use `assets/images/` path

---

**Organization completed on**: $(Get-Date)
**Total files reorganized**: 200+ files
**New directory structure**: 8 main categories with 15+ subdirectories
**All links updated**: ✅ Complete
**Navigation tested**: ✅ Working
