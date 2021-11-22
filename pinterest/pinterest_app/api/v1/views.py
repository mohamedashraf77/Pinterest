from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .Factory import PinterestFactory
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
                serializer.save()
                return Response(data={"message":"OK"}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)