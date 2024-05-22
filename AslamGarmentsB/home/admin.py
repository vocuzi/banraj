from django import forms
from django.contrib import admin
from django.utils.html import mark_safe
from .models import Customer, Address, Product, OrderItem, Order, image, Category, Subscription, Color, location
from rest_framework.authtoken.admin import TokenAdmin
from django.contrib.auth.models import User
from django.utils.translation import gettext_lazy as _
from django.template.response import TemplateResponse
from django.urls import path
from django.contrib.admin import AdminSite

TokenAdmin.raw_id_fields = ['user']
admin.site.site_header = "AG Admin"
admin.site.site_title = "Admin site"
admin.site.index_title = "AG Admin"

# Inline for images
class ImageInline(admin.TabularInline):
    model = image
    extra = 1
    fields = ('image_tag', 'image', 'is_main')
    readonly_fields = ('image_tag',)

    def image_tag(self, obj):
        if obj.image:
            return mark_safe(f'<img src="{obj.image.url}" width="100" height="100" />')
        return "NA"
    image_tag.short_description = 'Image'

# Inline for categories
class CategoryInline(admin.TabularInline):
    model = Category.products.through
    extra = 1
    fields = ('category',)

# Inline for colors
class ColorInline(admin.TabularInline):
    model = Color.products.through
    extra = 1
    fields = ('color',)

# Admin form for Product
class ProductAdminForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = ['name', 'discription', 'stock', 'marketPrice', 'sellingPrice']
        widgets = {
            'category': forms.CheckboxSelectMultiple,
            'color': forms.CheckboxSelectMultiple,
        }

# Product admin
@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    form = ProductAdminForm
    inlines = [ImageInline, CategoryInline, ColorInline]
    list_display = ['name', 'id', 'marketPrice', 'sellingPrice', 'stock', 'main_image_tag', 'additional_images_tag']
    search_fields = ['name']
    list_filter = ['category', 'color']
            
    def save_formset(self, request, form, formset, change):
        if formset.model == image:
            instances = formset.save(commit=False)
            for instance in instances:
                instance.belongs_to = form.instance
                instance.save()
                form.instance.images.add(instance)  # Add the image to the many-to-many field
            formset.save_m2m()
        else:
            formset.save()

    def main_image_tag(self, obj):
        main_image = obj.mainImage
        if main_image and main_image.image:
            return mark_safe(f'<img src="{main_image.image.url}" width="50" height="50" />')
        return "-"
    main_image_tag.short_description = 'Main Image'

    def additional_images_tag(self, obj):
        images_html = ''
        for img in obj.notMainImages:
            if img.image:
                images_html += f'<img src="{img.image.url}" width="50" height="50" style="margin-right: 5px;" />'
        return mark_safe(images_html if images_html else "-")
    additional_images_tag.short_description = 'Additional Images'

# Customer admin
@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['user', 'pic', 'address']

# Address admin
@admin.register(Address)
class AddressAdmin(admin.ModelAdmin):
    list_display = ['doorNo', 'buildingName', 'street', 'city', 'state', 'country', 'pincode', 'landmark', 'location', 'phone']

# OrderItem admin
@admin.register(OrderItem)
class OrderItemAdmin(admin.ModelAdmin):
    list_display = ['product', 'quantity', 'date_added']

# Order admin
@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['customer', 'date', 'status', 'payment', 'get_cart_total', 'is_deliveried']

# Image admin
@admin.register(image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ['image_tag', 'is_main','belongs_to']

    def image_tag(self, obj):
        if obj.image:
            return mark_safe(f'<img src="{obj.image.url}" width="50" height="50" />')
        return "-"
    image_tag.short_description = 'Image'

# Category admin
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ['name', 'image_tag']
    list_filter = ['name']
    readonly_fields = ('image_tag',)
    
    def image_tag(self, obj):
        if obj.image:
            return mark_safe(f'<img src="{obj.image.url}" width="100" height="100" />')
        return "NA"
    image_tag.short_description = 'Image'

# Subscription admin
@admin.register(Subscription)
class SubscriptionAdmin(admin.ModelAdmin):
    list_display = ['email']

# Color admin
@admin.register(Color)
class ColorAdmin(admin.ModelAdmin):
    list_display = ['color']

# Custom admin site
class MyAdminSite(AdminSite):
    site_header = "AG Admin"
    site_title = "Admin site"
    index_title = "AG Admin"

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('', self.admin_view(self.custom_index), name='index'),
        ]
        return custom_urls + urls

    def custom_index(self, request, extra_context=None):
        model_order = [
            'Product',
            'Order',
            'Customer',
            'Address',
            'OrderItem',
            'Image',  # Ensure this matches the actual object_name
            'Category',
            'Subscription',
            'Color',
        ]
        app_list = self.get_app_list(request)
        for app in app_list:
            app['models'].sort(key=lambda x: model_order.index(x['object_name']) if x['object_name'] in model_order else 100)
        context = {
            **self.each_context(request),
            'title': self.index_title,
            'app_list': app_list,
        }
        return TemplateResponse(request, 'admin/index.html', context)

admin_site = MyAdminSite(name='myadmin')

# Registering models with custom admin site
admin_site.register(Order, OrderAdmin)
admin_site.register(Customer, CustomerAdmin)
admin_site.register(Address, AddressAdmin)
admin_site.register(OrderItem, OrderItemAdmin)
admin_site.register(Product, ProductAdmin)
admin_site.register(image, ImageAdmin)
admin_site.register(Category, CategoryAdmin)
admin_site.register(Subscription, SubscriptionAdmin)
admin_site.register(Color, ColorAdmin)