from tensorflow import keras
import cv2
import numpy as np
import sys, os

# path= "D:\\Work\\Disease Detection\\Dataset\\CNN-covid-Dataset\\COVID\\COVID-2.png"
model = keras.models.load_model(os.path.join(os.getcwd(), "model\\covid19_pneumonia.h5"))
resize = 150

def preprocess_image(image_path):
    image = cv2.imread(image_path, 1)
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    image = cv2.resize(image, (resize, resize)) /255
    image = np.array(image)
    image = np.expand_dims(image, axis=0)
    return image

def prediction(img_path):
    image = preprocess_image(img_path)
    output = model.predict(image)
    output = np.argmax(output,axis=1)
    
    if output == 0:
        print('COVID-19')
    elif output == 1:
        print('Normal')
    else:
        print('Pneumonia')

prediction(sys.argv[1])
# prediction(path)