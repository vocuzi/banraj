from . import models,serializers,filters
from django.contrib.auth.models import User
from django.contrib.auth.models import Group
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes,authentication_classes
from rest_framework.permissions import IsAuthenticated,AllowAny,IsAdminUser
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import OrderingFilter
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
    
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

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def logout(request):
    request.user.auth_token.delete()
    cont = {
        'user':request.user.username,
        'message':'Logout Successfully'
    }
    return Response(cont)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def checkAuth(request):
    return Response({'message':'Authenticated'}) 

@api_view(['GET'])
@permission_classes([AllowAny])
def getCategories(request):
    categories = models.Category.objects.all()
    serializer = serializers.CategorySerializer(categories, many=True)
    cont = {
        'message':"Success",
        'data':serializer.data,
    }
    return Response(cont) 

class ProductListView(generics.ListAPIView):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductSerializer
    filter_backends = [DjangoFilterBackend,OrderingFilter]
    filterset_class = filters.ProductFilter

    def get_queryset(self):
        queryset = super().get_queryset()
        query = self.request.query_params.get('search', None)
        if query:
            queryset = queryset.filter(name__icontains=query)
        return queryset

@api_view(['GET'])
@permission_classes([AllowAny])
def getcolors(request):
    colors = models.Color.objects.all()
    serializer = serializers.ColorSerializer(colors, many=True)
    cont = {
        'message':"Success",
        'data':serializer.data,
    }
    return Response(cont)

@api_view(['GET'])
@permission_classes([AllowAny])
def getsizes(request):
    sizes = models.Size.objects.all()
    serializer = serializers.SizeSerializer(sizes, many=True)
    cont = {
        'message':"Success",
        'data':serializer.data,
    }
    return Response(cont)

@api_view(["POST"])
@permission_classes([AllowAny])
def makeSubscription(request):  
    if request.method == 'POST':
        serializer = serializers.SubscriptionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'Subscribed Successfully'})
        return Response(serializer.errors)

@api_view(["GET"])
@permission_classes([AllowAny])
def getProduct(request,pid):
    product = models.Product.objects.get(id=pid)
    product_serial = serializers.ProductSerializer(product)
    product_variant = models.ProductVariant.objects.filter(product=product)
    variant_exists = models.ProductVariant.objects.filter(product=product).exists()
    if not variant_exists:
        cont = {
            "variant":False,
            "product":product_serial.data
        }
        return Response(cont)
        
    variant_serial = serializers.ProductVariantSerializer(product_variant,many=True)
    cont = {
            "variant":True,
            "variants":variant_serial.data
        }
    return Response(cont)