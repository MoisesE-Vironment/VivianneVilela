from PIL import Image
from pathlib import Path

paths = [
    Path('/home/ubuntu/upload/WhatsAppImage2026-08-13at11.14.31(1).png'),
    Path('/home/ubuntu/webdev-static-assets/vivianne-hero-enhanced.png'),
]
for path in paths:
    image = Image.open(path)
    print(path.name, image.mode, image.size, 'transparency' in image.info, image.info.get('transparency'))
    if 'A' in image.getbands():
        alpha = image.getchannel('A')
        print('alpha-extrema', alpha.getextrema(), 'transparent-pixels', sum(1 for value in alpha.getdata() if value < 255))
