from PIL import Image
from pathlib import Path
path = Path('/home/ubuntu/webdev-static-assets/vivianne-hero-cutout.png')
image = Image.open(path).convert('RGBA')
alpha = image.getchannel('A')
print('mode', image.mode)
print('alpha extrema', alpha.getextrema())
print('corner', image.getpixel((0, 0)))
