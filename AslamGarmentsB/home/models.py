from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField
from phonenumber_field.modelfields import PhoneNumberField
from django.utils import timezone
from django.conf import settings
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token

@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)
        
class location(models.Model):
    latitude = models.FloatField()
    longitude = models.FloatField()
    
    def __str__(self):
        return f'{self.latitude}, {self.longitude}'

class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    pic = models.ImageField(upload_to='profile_pic/', null=True, blank=True)
    address = models.OneToOneField("home.Address", on_delete=models.CASCADE, null=True, blank=True)
    
    def __str__(self):
        return self.user.username

class Address(models.Model):
    doorNo = models.CharField(max_length=200)
    buildingName = models.CharField(max_length=200,null=True, blank=True) 
    street = models.CharField(max_length=200,null=True, blank=True)
    city = models.CharField(max_length=200, null=True, blank=True)
    state = models.CharField(max_length=200, null=True, blank=True)
    country = models.CharField(max_length=200, null=True, blank=True)
    pincode = models.CharField(max_length=200, null=True, blank=True)
    landmark = models.CharField(max_length=200, null=True, blank=True)
    location = models.OneToOneField(location, on_delete=models.CASCADE, null=True, blank=True)
    phone = PhoneNumberField(blank=True)
    
    class Meta:
        verbose_name = 'Address'
        verbose_name_plural = 'Addresses'

class image(models.Model):
    belongs_to = models.ForeignKey("home.Product", on_delete=models.CASCADE,null=True)
    image = models.ImageField(upload_to='product_pic/', null=True, blank=True)
    is_main = models.BooleanField(default=False)
    
class Product(models.Model):
    name = models.CharField(max_length=200) 
    discription = models.TextField(null=True, blank=True)
    stock = models.IntegerField()
    product_color = models.ForeignKey('home.Color', on_delete=models.CASCADE,null=True,blank=True)
    marketPrice = models.FloatField()
    sellingPrice = models.FloatField()
    images = models.ManyToManyField(image, blank=True)
    product_size = models.ForeignKey("home.Size", on_delete=models.CASCADE, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        colors = self.color_set.all().values_list('color', flat=True)
        colors_str = ", ".join(colors) if colors else "No colors"
        return f"{self.id}. {self.name} ({colors_str}) ({self.stock} in stock)"
    
    @property
    def mainImage(self):
        for image in self.images.all():
            if image.is_main:
                return image
        return None
    
    @property
    def notMainImages(self):
        images = []
        for image in self.images.all():
            if not image.is_main:
                images.append(image)
        return images
    
    @property
    def categories(self):
        category = Category.objects.filter(products__id=self.id)
        return category
    
    @property
    def colors(self):
        return ", ".join(self.color_set.all().values_list('color', flat=True))
    
    @property
    def sizes(self):
        return ", ".join(self.size_set.all().values_list('size', flat=True))

class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    quantity = models.IntegerField(default=1)
    date_added = models.DateTimeField(auto_now_add=True)

    @property
    def get_total(self)->float:
        total = self.product.sellingPrice * self.quantity
        return total   

class ProductVariant(models.Model):
    variant = models.CharField(max_length=50,default="NA")
    product = models.ManyToManyField("home.Product", blank=True)

    def __str__(self):
        products = self.product.all()
        product_str_list = [f"{product.name} - {product.product_color}" for product in products]
        return ", ".join(product_str_list) if product_str_list else "No Products"

    @property
    def total_products(self) -> int:
        return self.product.count()

    
class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True, blank=True)
    products = models.ManyToManyField(OrderItem, blank=True) 
    date = models.DateTimeField(auto_now_add=True)
    status_opt = [
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('cancelled', 'Cancelled'),
        ('out_for_delivery', 'Out for delivery'),
        ('delivered', 'Delivered'),
    ]
    status = models.CharField(max_length=200, choices=status_opt, default='pending')
    pay_opt = [
        ('cod', 'Cash on delivery'),
        ('online', 'Online payment'),
    ]
    payment = models.CharField(max_length=200, choices=pay_opt, default='cod')

    def __str__(self):
        return str(self.id)
    
    @property
    def get_cart_total(self)->float:
        total = 0
        for order_item in self.products.all():
            total += order_item.get_total
        return total
    
    @property
    def is_deliveried(self)->bool:
        if self.status == 'delivered':
            return True
        return False

class Category(models.Model):
    name = models.CharField(max_length=200)
    products = models.ManyToManyField(Product, blank=True)
    image = models.ImageField(upload_to='category_pic/', null=True, blank=True)
    
    def __str__(self):
        return self.name
    
    @property
    def total_products(self)->int:
        return self.products.count()
    
    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'

class Subscription(models.Model):
    email = models.EmailField(unique=True)

class Color(models.Model):
    color = models.CharField(max_length=50)
    hexcode = models.CharField(max_length=50, null=True, blank=True)
    products = models.ManyToManyField(Product, blank=True,verbose_name="Products Colors")
    
    def __str__(self):
        return self.color
    
    @property
    def total_products(self)->int:
        return self.products.count()
    
    class Meta:
        verbose_name = 'Color'
        verbose_name_plural = 'Colors'

class Size(models.Model):
    size_opt = [
        ("XS","Extra Small"),
        ('S', 'Small'),
        ('M', 'Medium'),
        ('L', 'Large'),
        ('XL', 'Extra Large'),
        ('XXL', 'Extra Extra Large'),
    ]
    size = models.CharField(max_length=50,choices=size_opt,null=True,blank=True)
    products = models.ManyToManyField(Product, blank=True,verbose_name="Products Sizes")
    
    def __str__(self):
        return self.size
    
    @property
    def total_products(self)->int:
        return self.products.count()
    
    class Meta:
        verbose_name = 'Size'
        verbose_name_plural = 'Sizes'