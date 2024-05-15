from . import models,serializers
from django.contrib.auth.models import User
from django.contrib.auth.models import Group
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny,IsAdminUser
    
@api_view(['POST']) 
@permission_classes([AllowAny])
def register(request):
    if request.method == 'POST':
        serializer = serializers.UserSerializer(data=request.data)
        if request.data['email']:
            pass
        else:
            return Response({'email':"Please Provide your Mail Address"})
        if serializer.is_valid():
            if User.objects.filter(email=request.data['email']).exists():
                return Response({'message':'Email Already Exists'}) 
            
            user = serializer.save()
            group = Group.objects.get(name='Customer')
            user.groups.add(group)
            customer = models.Customer(user=user)
            customer.save()
            cont = serializer.data
            cont['token'] = Token.objects.get(user=user).key
            cont['groups'] = [group.name]
            cont['message'] = 'User Created Successfully'
            return Response(cont)
        return Response(serializer.errors)

class CustomAuthToken(ObtainAuthToken):
    permission_classes = [AllowAny]
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    request.user.auth_token.delete()
    cont = {
        'user':request.user.username,
        'message':'Logout Successfully'
    }
    return Response(cont)

@api_view(['GET'])
@permission_classes([AllowAny])
def getProducts(request):
    products = models.Product.objects.all()
    serializer = serializers.ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def getCategories(request):
    categories = models.Category.objects.all()
    serializer = serializers.CategorySerializer(categories, many=True)
    return Response(serializer.data) 

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def checkAuth(request):
    return Response({'message':'Authenticated'})