import os
import requests
from bs4 import BeautifulSoup
from tqdm import tqdm
import time
from urllib.parse import urljoin, urlparse

BASE_URL = "https://blox-fruits.fandom.com"

CATEGORY_PAGES = {
    "Accessories": "/wiki/Accessories",
    "Guns": "/wiki/Guns",
    "Swords": "/wiki/Swords",
    "Styles": "/wiki/Styles",
    "Fruits": "/wiki/Blox_Fruits"
}

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                  "AppleWebKit/537.36 (KHTML, like Gecko) "
                  "Chrome/117.0 Safari/537.36"
}

def safe_filename(name: str) -> str:
    # Keep alphanumeric and a few safe characters; also trim length
    safe = "".join(c if c.isalnum() or c in " _-" else "_" for c in name)
    return safe[:100]  # limit length

def download_file(url: str, path: str, retries: int = 3, backoff: float = 1.0) -> bool:
    for attempt in range(1, retries + 1):
        try:
            with requests.get(url, headers=HEADERS, stream=True, timeout=20) as r:
                r.raise_for_status()
                with open(path, "wb") as f:
                    for chunk in r.iter_content(chunk_size=8192):
                        if chunk:
                            f.write(chunk)
            return True
        except Exception as e:
            print(f"❌ Attempt {attempt} failed for {url}: {e}")
            if attempt < retries:
                time.sleep(backoff * attempt)
            else:
                return False
    return False

def ensure_image_url(page_url: str) -> str:
    try:
        res = requests.get(page_url, headers=HEADERS, timeout=15)
        if res.status_code != 200:
            return None
        soup = BeautifulSoup(res.text, "html.parser")

        # 1) Infobox image (typical in Fandom/Wiki)
        infobox = soup.find("aside")
        if infobox:
            img = infobox.find("img")
            if img:
                link = img.get("data-src") or img.get("src")
                if link:
                    return link.split("/revision/")[0] if "/revision/" in link else link

        # 2) Fallback: a clearly marked image in the article content
        content_img = soup.select_one(".mw-parser-output img")
        if content_img:
            link = content_img.get("data-src") or content_img.get("src")
            if link:
                return link.split("/revision/")[0] if "/revision/" in link else link

    except Exception as e:
        print(f"❌ Error fetching {page_url}: {e}")
    return None

# Main loop
for category, page_path in CATEGORY_PAGES.items():
    print(f"\n📂 Category: {category}")
    os.makedirs(category, exist_ok=True)

    res = requests.get(BASE_URL + page_path, headers=HEADERS, timeout=20)
    if res.status_code != 200:
        print(f"⚠️ Failed to fetch {BASE_URL + page_path} (status {res.status_code})")
        continue

    soup = BeautifulSoup(res.text, "html.parser")

    # Collect item links robustly: only links under /wiki/ and with meaningful titles
    links = {}
    for a in soup.find_all("a", href=True):
        href = a["href"]
        if not href.startswith("/wiki/"):
            continue
        if ":" in href:  # skip pages like /wiki/Help:... or /wiki/User:
            continue
        title = a.get("title") or a.get_text(strip=True)
        if not title:
            continue
        full_url = urljoin(BASE_URL, href)
        links[title] = full_url

    # Remove potential duplicates and sort for reproducibility
    unique_links = dict(sorted(links.items(), key=lambda x: x[0]))

    for title, url in tqdm(unique_links.items(), desc=f"Downloading {category}"):
        img_url = ensure_image_url(url)
        if not img_url:
            print(f"⚠️ No image found for {title} ({url})")
            continue

        # Create a unique filename: category/slug or title hash
        filename = safe_filename(title)
        # Append a short hash of URL to avoid collisions if titles repeat
        url_hash = abs(hash(url)) % (10**6)
        final_name = f"{filename}_{url_hash}.png"
        save_path = os.path.join(category, final_name)

        success = download_file(img_url, save_path, retries=3, backoff=2.0)
        if not success:
            print(f"⚠️ Failed to download image for {title} from {img_url}")
        time.sleep(0.5)  # gentle pacing
