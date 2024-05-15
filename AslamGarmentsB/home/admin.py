from unicodedata import category
from django.contrib import admin
from .models import Customer, Address, Product, OrderItem,Order,image,Category
from rest_framework.authtoken.admin import TokenAdmin


TokenAdmin.raw_id_fields = ['user']
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['user', 'pic', 'address']

class AddressAdmin(admin.ModelAdmin):
    list_display = ['doorNo', 'buildingName', 'street', 'city', 'state', 'country', 'pincode', 'landmark', 'location', 'phone']
    
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name', 'discription', 'color', 'stock', 'marketPrice', 'sellingPrice',]
    
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['product', 'quantity', 'date_added']
    
class OrderAdmin(admin.ModelAdmin):
    list_display = ['customer', 'date', 'status','payment','get_cart_total','is_deliveried']
    
@admin.register(image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ['image', 'is_main']

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name','image']

admin.site.register(Order, OrderAdmin)
admin.site.register(Customer, CustomerAdmin)
admin.site.register(Address, AddressAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(OrderItem, OrderItemAdmin)