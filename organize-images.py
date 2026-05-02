#!/usr/bin/env python3
import os
import shutil
import json
from pathlib import Path

# Base path
BASE_PATH = r"d:\GIT\kdp\assets\images"
ANH_PATH = os.path.join(BASE_PATH, "anh")

# Categories
CATEGORIES = ["executive", "corporate", "entrepreneur", "influencer"]

# Create category directories if not exist
for cat in CATEGORIES:
    cat_path = os.path.join(BASE_PATH, cat)
    os.makedirs(cat_path, exist_ok=True)

# Get all images from anh folder
images = []
if os.path.exists(ANH_PATH):
    for file in os.listdir(ANH_PATH):
        if file.lower().endswith(('.jpg', '.jpeg', '.png', '.gif')):
            images.append(file)

images.sort()
print(f"Found {len(images)} images")

# Distribute images across categories
portfolio_data = {cat: [] for cat in CATEGORIES}
idx = 0

for img_file in images:
    src = os.path.join(ANH_PATH, img_file)
    category = CATEGORIES[idx % len(CATEGORIES)]
    dst = os.path.join(BASE_PATH, category, img_file)
    
    # Copy image to category folder
    shutil.copy2(src, dst)
    
    # Add to portfolio data
    title = img_file.replace('.jpg', '').replace('.jpeg', '').replace('.png', '').replace('.gif', '')
    portfolio_data[category].append({
        "image": f"assets/images/{category}/{img_file}",
        "title": f"{category.capitalize()} - {title}",
        "subtitle": f"Chân dung {category}",
        "category": category
    })
    
    print(f"[{idx+1}/{len(images)}] {img_file} -> {category}")
    idx += 1

# Generate data.json
data = {
    "portfolio": portfolio_data,
    "beforeAfter": [
        {
            "title": "Executive Portrait",
            "before": "assets/images/executive/kdp (1).jpg",
            "after": "assets/images/executive/kdp (2).jpg"
        },
        {
            "title": "Corporate Profile",
            "before": "assets/images/corporate/kdp (1).jpg",
            "after": "assets/images/corporate/kdp (2).jpg"
        },
        {
            "title": "Entrepreneur Branding",
            "before": "assets/images/entrepreneur/kdp (1).jpg",
            "after": "assets/images/entrepreneur/kdp (2).jpg"
        }
    ],
    "blog": []
}

# Write data.json
output_file = os.path.join(BASE_PATH, "..", "data.json")
with open(output_file, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print(f"\n✓ Created data.json with {len(images)} images")
print(f"✓ Distribution:")
for cat in CATEGORIES:
    count = len(portfolio_data[cat])
    print(f"  - {cat}: {count} images")
