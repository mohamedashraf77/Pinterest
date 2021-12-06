from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .Factory import PinterestFactory
from pinterest_app.models import pin_tags, Pin, Board
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import PinteresrSerializer
import json


class Crud_ops:
    @api_view(["GET"])
    @permission_classes([IsAuthenticated])
    def obj_list(request, obj):

        model = PinterestFactory(obj)
        data = model.model.all()
        serializer = model.get_serialzer(model= obj, instance=data, many=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)

    @api_view(["GET"])
    @permission_classes([IsAuthenticated])
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
    @permission_classes([IsAuthenticated])
    def obj_create(request, obj):
        print(request.data)
        model = PinterestFactory(obj)
        if request.method == 'POST':
            request.data._mutable = True
            data = request.data.dict()
            data['user'] = request.user.id
            request.data.update(data)
            serializer = model.get_serialzer(model= obj, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(data={"message":"OK"}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @api_view(['DELETE'])
    @permission_classes([IsAuthenticated])
    def obj_delete(request, obj, id):
        try:
            model = PinterestFactory(obj)
            data = model.model.get(pk=id)
            data.delete()
            return Response(data={"message": "done"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(data={"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    @api_view(['PUT', 'PATCH'])
    @permission_classes([IsAuthenticated])
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
@permission_classes([IsAuthenticated])
def home(request):
    print(request.user)
    try:
        pins_list = []
        tags = request.user.tags.all()
        model = PinterestFactory('pin')
        for tag in tags:
            print(tag)
            pins = tag.pin.all()
            print(pins)
            for pin in pins:
                PinteresrSerializer.Meta.model= Pin
                serializer = PinteresrSerializer(instance=pin)
                pins_list.append(serializer.data)
                # print(pin)
                # data = model.model.filter(pk=pin.id)
                # if data.exists():
                #     data = data.first()
                #     serializer = model.get_serialzer(model='pin', instance=data)
                #     pins_list.append(serializer.data)

        return Response(data={"pins": pins_list}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(data={"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(["GET"])
def tags_list(request):
    print(request.data)
    data = []
    tags = pin_tags.objects.all()
    print(tags)
    for tag in tags:
        img = {}
        img['title'] = tag.tag
        try:
            url = tag.pin.all().first().url.url
            real_url = request.build_absolute_uri(url)
            img['img'] = real_url
            data.append(img)
        except:
            pass
    return Response(data={'imgs':data}, status=status.HTTP_200_OK)

