#!/usr/bin/env python3
from PIL import Image, ImageDraw

# Create a placeholder hero background image with engineering theme in gold tones
width = 1920
height = 1080

# Create a gold gradient background
img = Image.new('RGB', (width, height), '#B6A054')
draw = ImageDraw.Draw(img)

# Add gradient effect from dark to light gold
for i in range(height):
    alpha = i / height
    r = int(182 + (220 - 182) * alpha)  # Gradient from gold to lighter gold
    g = int(160 + (200 - 160) * alpha)
    b = int(84 + (120 - 84) * alpha)
    draw.rectangle([(0, i), (width, i + 1)], fill=(r, g, b))

# Save the placeholder
img.save('public/images/hero-bg.jpg', 'JPEG', quality=85)
print("Placeholder hero background created at public/images/hero-bg.jpg")
print("Please replace this with the actual engineering-themed background image")