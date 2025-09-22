#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont
import os

# Create a proper placeholder for MTP logo
# Since we can't recreate the exact logo, let's create a professional placeholder

width = 400
height = 400

# Create white background
img = Image.new('RGB', (width, height), 'white')
draw = ImageDraw.Draw(img)

# Draw a stylized MTP logo placeholder
# Draw outer circle/shield shape
draw.ellipse([50, 50, 350, 350], outline='#2C3E50', width=5)

# Draw M shape
m_points = [
    (100, 250),
    (130, 150),
    (200, 220),
    (270, 150),
    (300, 250)
]
draw.line(m_points, fill='#2C3E50', width=8)

# Draw T shape with golden color
draw.rectangle([180, 180, 220, 300], fill='#B8860B')  # Vertical bar
draw.rectangle([140, 180, 260, 210], fill='#B8860B')  # Horizontal bar

# Add MTP text below
try:
    # Try to use a better font if available
    from PIL import ImageFont
    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 40)
except:
    font = ImageFont.load_default()

text_bbox = draw.textbbox((0, 0), "MTP", font=font)
text_width = text_bbox[2] - text_bbox[0]
text_x = (width - text_width) // 2
draw.text((text_x, 310), "MTP", fill='#2C3E50', font=font)

# Save the logo
img.save('public/images/mtp-logo-temp.png')
print("Temporary MTP logo created at public/images/mtp-logo-temp.png")
print("Please replace this with the actual MTP logo file")