from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from pinterest_app.models import User, pin_tags

@api_view(['POST'])
def signup(request):
    print("mohamed")
    print(request.data)
    print("mohamed")
    serializer = UserSerializer(data= request.data)
    if serializer.is_valid():
        serializer.user_validate()
        user = serializer.save()
        token = Token.objects.create(user=user)
        print(token)
        return Response({'Authorization': 'Token '+token.key}, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    try:
        request.user.auth_token.delete()
        return Response(data={"message": "done"}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response(data={"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def set_gender(request):
    try:
        user = request.user
        user.gender = request.data['gender']
        user.save()
        return Response(data={"message": "done"}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(data={"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def set_tags(request):
    try:
        print(request.data)
        user = request.user
        tags = request.data['tags']
        tags_list = tags.split(',')
        for tag in tags_list:
            print(tag)
            t = pin_tags.objects.get(tag=tag)
            user.tags.add(t)
        return Response(data={"message": "done"}, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(data={"message": str(e)}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def login_check(request):
    print(request.user.gender)
    if request.user.gender:
        return Response(data={"message": "done"}, status=status.HTTP_200_OK)
    else:
        return Response(data={"message": "none"}, status=status.HTTP_200_OK)