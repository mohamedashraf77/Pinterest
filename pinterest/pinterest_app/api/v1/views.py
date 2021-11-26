from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .Factory import PinterestFactory
import tensorflow as tf
import cv2
import numpy as np

class Crud_ops:
    @api_view(["GET"])
    def obj_list(request, obj):
        model = PinterestFactory(obj)
        data = model.model.all()
        serializer = model.get_serialzer(model= obj, instance=data, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    @api_view(["GET"])
    def obj_deatails(request, obj, id):
        model = PinterestFactory(obj)
        data = model.model.filter(pk= id)
        if data.exists():
            data = data.first()
            serializer = model.get_serialzer(model= obj, instance=data)
            return Response(data=serializer.data, status=status.HTTP_200_OK)
        else:
            return Response(data={"message":"data dosn't exist"}, status=status.HTTP_400_BAD_REQUEST)

    @api_view(["post"])
    def obj_create(request, obj):
        model = PinterestFactory(obj)
        if request.method == 'POST':
            serializer = model.get_serialzer(model= obj, data=request.data)
            if serializer.is_valid():
                tf.keras.applications.InceptionV3(
                    include_top=True,
                    weights="imagenet",
                    input_tensor=None,
                    input_shape=None,
                    pooling=None,
                    classes=1000,
                    classifier_activation="softmax",
                )
                serializer.save()
                # content = request.data['url'].content()
                # print(content)
                # print(type(content))
                # request.data['url'].seek(0)
                # img_file = request.data['url'].read()
                # print(img_file)
                # print(type(img_file))
                # npimg = np.fromfile(request.data['url'], np.uint8)
                # img = cv2.imdecode(npimg, cv2.IMREAD_COLOR)
                # cv2.imshow('image', img)
                # cv2.waitKey(0)
                return Response(data={"message":"OK"}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @api_view(['DELETE'])
    def obj_delete(request, obj, id):
        try:
            model = PinterestFactory(obj)
            data = model.model.get(pk=id)
            data.delete()
            return Response(data={"message": "done"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(data={"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @api_view(['PUT', 'PATCH'])
    def obj_update(request, obj, id):
        try:
            model = PinterestFactory(obj)
            data = model.model.get(pk=id)
        except Exception as e:
            return Response(data={"message": e}, status=status.HTTP_400_BAD_REQUEST)
        serializer = None
        if request.method == 'PUT':
            serializer = model.get_serialzer(model= obj, instance=data, data=request.data)
        elif request.method == 'PATCH':
            serializer = model.get_serialzer(model= obj, instance=data, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def home(request):
    if request.user.is_authenticated:
        pass
    else:
        return Response(data={"message": "not authenticated"}, status=status.HTTP_400_BAD_REQUEST)