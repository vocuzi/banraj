from django.contrib import admin
from .models import Customer, Address, Product, OrderItem,Order

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

admin.site.register(Order, OrderAdmin)
admin.site.register(Customer, CustomerAdmin)
admin.site.register(Address, AddressAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(OrderItem, OrderItemAdmin)