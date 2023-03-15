from tensorflow import keras
import cv2
import numpy as np
import sys, os

# path= "D:\\Work\\Disease Detection\\Dataset\\Brain-Tumor-Classification-DataSet\\Testing\\no_tumor\\image(1).jpg"
model = keras.models.load_model(os.path.join(os.getcwd(), "model\\brain_tumor.h5"))
resize = 150

def preprocess_image(image_path):
    image = cv2.imread(image_path)
    image = cv2.resize(image, (resize, resize))
    img_array = np.array(image)
    img_array = img_array.reshape(1, resize, resize, 3)
    return img_array

def prediction(img_path):
    image = preprocess_image(img_path)
    output = model.predict(image)
    # output = np.argmax(output, axis=-1)
    output = output.argmax()
    if output == 0:
        print('Glioma Tumor')
    elif output == 1:
        print('Meningioma Tumor')
    elif output == 3:
        print('Pituitary Tumor')
    else:
        print('No Tumor')

prediction(sys.argv[1])
# prediction(path)
