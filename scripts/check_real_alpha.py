from PIL import Image
from pathlib import Path
path = Path('/home/ubuntu/webdev-static-assets/vivianne-hero-cutout-real.png')
image = Image.open(path).convert('RGBA')
print('mode', image.mode)
print('alpha extrema', image.getchannel('A').getextrema())
print('corner', image.getpixel((0, 0)))
