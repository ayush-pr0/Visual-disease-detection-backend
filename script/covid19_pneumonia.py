from tensorflow import keras
import matplotlib.pyplot as plt
import PIL
from make_gradcam_heatmap import make_gradcam_heatmap
from save_and_display_gradcam import save_and_display_gradcam
# from IPython.display import Image, display
import cv2
import numpy as np
import sys, os

# path= "D:\\Work\\Disease Detection\\Dataset\\CNN-covid-Dataset\\COVID\\COVID-2.png"
model = keras.models.load_model(os.path.join(os.getcwd(), "model\\covid19_pneumonia.h5"))
resize = 150
class_names = ['COVID-19', 'Normal', 'Pneumonia']

def get_img_array(image_path):
    image = cv2.imread(image_path, 1)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image = cv2.resize(image, (resize, resize)) /255
    image = np.array(image)
    image = np.expand_dims(image, axis=0)
    return image

def prediction(img_path):
    image = get_img_array(img_path)
    heatmap = make_gradcam_heatmap(image, model, last_conv_layer_name="conv2d_2")

    # print(type(heatmap))
    # heatmapImg = PIL.Image.fromarray(heatmapImg)
    # heatmapImg = heatmapImg.convert("L")
    # heatmapImg = keras.preprocessing.image.array_to_img(heatmapImg)
    # print(heatmapImg.shape)
    # heatmapImg.save("heatmap.png")

    # plt.title("Heat Map")
    # plt.imshow(heatmap)
    # plt.show()
    cam_path = os.path.join(os.getcwd(), "result\\covid19_pneumonia", "result_" + os.path.basename(img_path))
    save_and_display_gradcam(img_path, heatmap, cam_path)
    output = model.predict(image)
    output = np.argmax(output,axis=1)[0]
    print(class_names[output])
    # a = plt.imread(path)
    # plt.imshow(a, cmap = "gray")
    # plt.title("Original image")
    # plt.show()

prediction(sys.argv[1])
# prediction(path)