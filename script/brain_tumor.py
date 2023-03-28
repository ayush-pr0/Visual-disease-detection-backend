from tensorflow import keras
# import matplotlib.pyplot as plt
import cv2
import numpy as np
from make_gradcam_heatmap import make_gradcam_heatmap
from save_and_display_gradcam import save_and_display_gradcam
import sys, os

# path= "D:\\Work\\Disease Detection\\Dataset\\Brain-Tumor-Classification-DataSet\\Testing\\no_tumor\\image(4).jpg"
# path= "D:\\Work\\Disease Detection\\Dataset\\Brain-Tumor-Classification-DataSet\\Testing\\glioma_tumor\\image(3).jpg"
model = keras.models.load_model(os.path.join(os.getcwd(), "model\\brain_tumor.h5"))
resize = 150
class_names = ['Glioma Tumor', 'Meningioma Tumor', 'No Tumor', 'Pituitary Tumor']

def get_img_array(image_path):
    image = cv2.imread(image_path)
    image = cv2.resize(image, (resize, resize))
    img_array = np.array(image)
    img_array = img_array.reshape(1, resize, resize, 3)
    return img_array

def prediction(img_path):
    image = get_img_array(img_path)
    heatmap = make_gradcam_heatmap(image, model, last_conv_layer_name="conv2d_8")
    # plt.title("Heat Map")
    # plt.imshow(heatmap)
    # plt.show()
    cam_path = os.path.join(os.getcwd(), "result\\brain_tumor", "result_" + os.path.basename(img_path))
    save_and_display_gradcam(img_path, heatmap, cam_path)
    output = model.predict(image)
    # output = output.argmax()
    output = np.argmax(output, axis=1)[0]
    print(class_names[output])

prediction(sys.argv[1])
# prediction(path)
