from rest_framework import serializers
from . import models

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Password field for writing only
    class Meta:
        model = models.User
        fields = ['username', 'email', 'password']
    
    def create(self, validated_data):
        user = models.User(
            email=validated_data['email'],
            username=validated_data['username']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.username = validated_data.get('username', instance.username)
        instance.set_password(validated_data.get('password', instance.password))
        instance.save()
        return instance

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.image
        fields = ['image', 'is_main']
            
class ProductSerializer(serializers.ModelSerializer):
    images = ImageSerializer(many=True, read_only=True)
    class Meta:
        model = models.Product
        fields = ['name', 'discription', 'color', 'stock', 'marketPrice', 'sellingPrice', 'images']

class CategorySerializer(serializers.ModelSerializer): 
    class Meta:
        model = models.Category
        fields = ['name', 'image','total_products']