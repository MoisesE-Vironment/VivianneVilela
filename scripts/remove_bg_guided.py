from pathlib import Path
import cv2
import numpy as np

source = Path('/home/ubuntu/upload/WhatsAppImage2026-08-13at11.14.31(1).jpeg')
target = Path('/home/ubuntu/webdev-static-assets/vivianne-hero-guided.png')
image = cv2.imread(str(source), cv2.IMREAD_COLOR)
if image is None:
    raise SystemExit('source image could not be read')
height, width = image.shape[:2]
mask = np.full((height, width), cv2.GC_BGD, np.uint8)
poly = np.array([
    [420, 245], [565, 250], [720, 350], [830, 530], [1010, 720],
    [1035, 1180], [1030, 1595], [50, 1595], [70, 900], [230, 650], [340, 430]
], np.int32)
cv2.fillPoly(mask, [poly], cv2.GC_PR_FGD)
# Sure-foreground seeds on face, hair, shoulder, hands and clothing.
cv2.ellipse(mask, (535, 520), (170, 210), 0, 0, 360, cv2.GC_FGD, -1)
cv2.ellipse(mask, (500, 900), (260, 260), 0, 0, 360, cv2.GC_FGD, -1)
cv2.ellipse(mask, (550, 1340), (240, 260), 0, 0, 360, cv2.GC_FGD, -1)
background_model = np.zeros((1, 65), np.float64)
foreground_model = np.zeros((1, 65), np.float64)
cv2.grabCut(image, mask, None, background_model, foreground_model, 10, cv2.GC_INIT_WITH_MASK)
foreground = np.where((mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD), 255, 0).astype('uint8')
foreground = cv2.GaussianBlur(foreground, (0, 0), 1.2)
_, binary = cv2.threshold(foreground, 80, 255, cv2.THRESH_BINARY)
component_count, labels, stats, _ = cv2.connectedComponentsWithStats(binary, connectivity=8)
if component_count > 1:
    largest = 1 + int(np.argmax(stats[1:, cv2.CC_STAT_AREA]))
    binary = np.where(labels == largest, 255, 0).astype('uint8')
foreground = cv2.GaussianBlur(binary, (0, 0), 1.0)
rgba = cv2.cvtColor(image, cv2.COLOR_BGR2BGRA)
rgba[:, :, 3] = foreground
cv2.imwrite(str(target), rgba)
print(target)
