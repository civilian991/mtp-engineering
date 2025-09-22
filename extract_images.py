#!/usr/bin/env python3
import os
from PIL import Image

# Create output directory
os.makedirs('public/images', exist_ok=True)
os.makedirs('public/images/projects', exist_ok=True)

# Process page 1 - Extract logo only (top portion of the page)
print("Extracting logo from page 1...")
page1 = Image.open('public/images/company-profile/page-01.png')
width, height = page1.size
# The logo appears to be in the top 30% of the first page
logo = page1.crop((0, 0, width, int(height * 0.3)))
logo.save('public/images/mtp-logo.png')
print(f"Logo saved: {logo.size}")

# For now, let's use some placeholder images for projects
# Since the PDF pages contain full documents with text and images mixed,
# we'll need to use generic placeholder images or manually select regions

# Create simple colored placeholder images for projects
from PIL import Image, ImageDraw

projects = [
    ('infrastructure', (71, 125, 182)),  # Blue
    ('construction', (182, 125, 71)),    # Brown
    ('bridge', (71, 182, 125)),          # Green
    ('equipment', (182, 71, 125)),       # Pink
    ('aerial', (125, 71, 182))           # Purple
]

for name, color in projects:
    img = Image.new('RGB', (800, 600), color)
    draw = ImageDraw.Draw(img)
    # Add a subtle gradient effect
    for i in range(600):
        alpha = i / 600.0
        r = int(color[0] * (1 - alpha * 0.3))
        g = int(color[1] * (1 - alpha * 0.3))
        b = int(color[2] * (1 - alpha * 0.3))
        draw.line([(0, i), (800, i)], fill=(r, g, b))

    img.save(f'public/images/projects/{name}-project.png')
    print(f"Created placeholder for {name} project")

print("\nImages extracted successfully!")
print("Logo: public/images/mtp-logo.png")
print("Project placeholders created in: public/images/projects/")