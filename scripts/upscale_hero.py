from PIL import Image

source = '/home/ubuntu/upload/WhatsAppImage2026-08-13at11.14.31(1).png'
target = '/home/ubuntu/webdev-static-assets/vivianne-hero-upscaled.png'
image = Image.open(source).convert('RGBA')
image = image.resize((1599, 2400), Image.Resampling.LANCZOS)
image.save(target, 'PNG', optimize=True)
print(target, image.mode, image.size)
