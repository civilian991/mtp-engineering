#!/usr/bin/env python3
from PIL import Image, ImageDraw, ImageFont
import os

# Create a more accurate MTP logo based on the design shown
width = 500
height = 500

# Create transparent background
img = Image.new('RGBA', (width, height), (255, 255, 255, 0))
draw = ImageDraw.Draw(img)

# Define colors
black_color = '#2C3E50'
gold_color = '#B8860B'

# Center point
cx, cy = width // 2, height // 2

# Draw the interweaving M pattern at the top
# Three diamond/peak shapes
peaks_y = cy - 80
for i, x in enumerate([cx - 100, cx, cx + 100]):
    points = [
        (x, peaks_y - 40),  # top
        (x + 40, peaks_y),   # right
        (x, peaks_y + 40),   # bottom
        (x - 40, peaks_y)    # left
    ]
    draw.polygon(points, fill=black_color)

# Draw curved side elements (like parentheses)
# Left curve
draw.arc([(cx - 150, cy - 100), (cx - 50, cy + 100)],
         start=150, end=210, fill=black_color, width=20)
# Right curve
draw.arc([(cx + 50, cy - 100), (cx + 150, cy + 100)],
         start=-30, end=30, fill=black_color, width=20)

# Draw the T shape with golden color
# Horizontal bar with Arabic text space
t_top = cy - 20
draw.rectangle([cx - 80, t_top, cx + 80, t_top + 30], fill=gold_color)
# Vertical bar
draw.rectangle([cx - 15, t_top + 30, cx + 15, cy + 120], fill=gold_color)

# Draw the two vertical bars on sides (part of M)
# Left bar
draw.rectangle([cx - 60, cy + 20, cx - 40, cy + 120], fill=black_color)
# Right bar
draw.rectangle([cx + 40, cy + 20, cx + 60, cy + 120], fill=black_color)

# Add Arabic text "منصور" on the golden bar
try:
    # Try to use a font that supports Arabic
    font = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 20)
except:
    font = ImageFont.load_default()

# For now, add placeholder text
draw.text((cx - 30, t_top + 5), "Mansour", fill='white', font=font)

# Save the logo with transparency
img.save('public/images/mtp-logo-professional.png', 'PNG')
print("MTP logo created successfully!")

# Also create a version with white background
img_white = Image.new('RGB', (width, height), 'white')
img_white.paste(img, (0, 0), img)
img_white.save('public/images/mtp-logo-white-bg.png', 'PNG')
print("White background version also created!")