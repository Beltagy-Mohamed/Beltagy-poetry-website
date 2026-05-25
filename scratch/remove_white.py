from PIL import Image
import os

image_path = "static/images/wax-seal-custom.png"

try:
    img = Image.open(image_path).convert("RGBA")
    datas = img.getdata()

    newData = []
    # Make white (or near white) transparent
    for item in datas:
        # Check if the pixel is close to white
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            # Replace with a transparent pixel
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)

    img.putdata(newData)
    img.save(image_path, "PNG")
    print("Successfully made white background transparent.")
except Exception as e:
    print(f"Error: {e}")
