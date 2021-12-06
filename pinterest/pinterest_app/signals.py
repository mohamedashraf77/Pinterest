from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Pin, pin_tags, Board, User
import cv2
import numpy as np
import tensorflow as tf
import ast
import os

@receiver(post_save, sender=Pin)
def create_pin(sender, instance, created, **kwargs):
    if created:
        file_path = os.path.join(os.getcwd(), 'imagenet1000_clsidx_to_labels.txt')
        with open(file_path) as f:
            data = f.read()
        dictionary = ast.literal_eval(data)

        img = cv2.imread(instance.url.path)
        img = np.uint8(img)
        img = cv2.resize(img, (299, 299), interpolation=cv2.INTER_AREA)
        img = img.astype('float16')
        img /= 255

        inception = tf.keras.applications.InceptionV3(
            include_top=True,
            weights="imagenet",
            input_tensor=None,
            input_shape=None,
            pooling=None,
            classes=1000,
            classifier_activation="softmax",
        )
        x_input = []
        x_input.append(img)
        sample = np.array(x_input)
        prediction = inception.predict(sample)
        max_index = np.argmax(prediction[0])
        max_index = [0, 1, 2]
        max_value = [prediction[0][0], prediction[0][1], prediction[0][2]]
        for (i, prob) in enumerate(prediction[0]):
            if i > 2:
                if prob > max_value[0]:
                    max_index[0] = i
                    max_value[0] = prediction[0][i]
                elif prob > max_value[1]:
                    max_index[1] = i
                    max_value[1] = prediction[0][i]
                elif prob > max_value[2]:
                    max_index[2] = i
                    max_value[2] = prediction[0][i]
        for i in range(3):
            keys = dictionary[max_index[i]].split(',')
            for key in keys:
                if key[0] == ' ':
                    key = key[1:]
                try:
                    t = pin_tags.objects.create(tag=key)
                except:
                    t = pin_tags.objects.get(tag=key)

                t.pin.add(instance)

@receiver(post_save, sender=User)
def create_user(sender, instance, created, **kwargs):
    if created:
        print("create new board")
        Board.objects.create(title= "All Pins", user= instance)
