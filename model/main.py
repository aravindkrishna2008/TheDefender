from tensorflow.keras.layers import Input, Lambda, Dense, Flatten,Dropout
from tensorflow.keras.models import Model
from tensorflow.keras.applications.vgg19 import VGG19
from tensorflow.keras.applications.vgg19 import preprocess_input
from tensorflow.keras.preprocessing import image
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.models import Sequential
import numpy as np
import pandas as pd
import os
import cv2
import matplotlib.pyplot as plt
import tensorflow as tf


# Use yes_mask dir only and give a percentage if this person is actually wearing a mask or not
# with(tf.device('/CPU:0')):
#     train_path="dataset/train/mask/yes_mask"
#     test_path="dataset/test/mask"



#     x_train = []

#     train_datagen = ImageDataGenerator(rescale=1/255)
#     validation_datagen = ImageDataGenerator(rescale=1/255)

#     base_dir = '/Users/veerrohitv/Desktop/HackAlphaHacks/model/dataset/train/'
#     train_dandelion_names = os.listdir(base_dir)
#     print(len(train_dandelion_names))

#     train_generator = train_datagen.flow_from_directory(
#         '/Users/veerrohitv/Desktop/HackAlphaHacks/model/dataset/train/',  # This is the source directory for training images
#         classes = ['mask', 'no_mask'],
#         target_size=(200, 200),  # All images will be resized to 200x200
#         batch_size=1,
#         # Use binary labels
#         class_mode='binary')

# # Flow validation images in batches of 19 using valid_datagen generator
#     validation_generator = validation_datagen.flow_from_directory(
#         '/Users/veerrohitv/Desktop/HackAlphaHacks/model/dataset/test/',  # This is the source directory for training images
#         classes = ['mask', 'no_mask'],
#         target_size=(200, 200),  # All images will be resized to 200x200
#         batch_size=1,
#         # Use binary labels
#         class_mode='binary',
#         shuffle=False)

#     model = tf.keras.models.Sequential([
# # Note the input shape is the desired size of the image 200x200 with 3 bytes color
# # This is the first convolution
#     tf.keras.layers.Conv2D(16, (3,3), activation='relu', input_shape=(200, 200, 3)),
#     tf.keras.layers.MaxPooling2D(2, 2),
# # The second convolution
#     tf.keras.layers.Conv2D(32, (3,3), activation='relu'),
#     tf.keras.layers.MaxPooling2D(2,2),
# # The third convolution
#     tf.keras.layers.Conv2D(64, (3,3), activation='relu'),
#     tf.keras.layers.MaxPooling2D(2,2),
# # The fourth convolution
#     tf.keras.layers.Conv2D(64, (3,3), activation='relu'),
#     tf.keras.layers.MaxPooling2D(2,2),
# # # The fifth convolution
#     tf.keras.layers.Conv2D(64, (3,3), activation='relu'),
#     tf.keras.layers.MaxPooling2D(2,2),
# # Flatten the results to feed into a DNN
#     tf.keras.layers.Flatten(),
# # 512 neuron hidden layer
#     tf.keras.layers.Dense(512, activation='relu'),
# # Only 1 output neuron. It will contain a value from 0-1 where 0 for 1 class ('dandelions') and 1 for the other ('grass')
#     tf.keras.layers.Dense(1, activation='sigmoid')])

#     model.compile(loss='binary_crossentropy',
#     optimizer=tf.keras.optimizers.RMSprop(lr=0.001),
#     metrics='accuracy')

#     history = model.fit(train_generator,
#     steps_per_epoch=1,
#     epochs=100,
#     verbose=1,
#     validation_data = validation_generator,
#     validation_steps=8)
    
#     # model.save("/Users/veerrohitv/Desktop/HackAlphaHacks/ML_Models/mask_detector.h5")

#     print(model.evaluate(validation_generator).size())


