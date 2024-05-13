from django.db import models
from django.contrib.auth.models import User
from phonenumber_field.modelfields import PhoneNumberField
from django.contrib.postgres.fields import ArrayField
class location(models.Model):
    latitude = models.FloatField()
    longitude = models.FloatField()
    
    def __str__(self):
        return f'{self.latitude}, {self.longitude}'
class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    pic = models.ImageField(upload_to='profile_pic/', null=True, blank=True)
    address = models.OneToOneField("home.Address", on_delete=models.CASCADE, null=True, blank=True)

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

class image(models.Model):
    image = models.ImageField(upload_to='product_pic/', null=True, blank=True)
    is_main = models.BooleanField(default=False)
    
class Product(models.Model):
    color_choices = [
        ('red', 'Red'),
        ('blue', 'Blue'),
        ('green', 'Green'),
        ('yellow', 'Yellow'),
        ('black', 'Black'),
        ('white', 'White'),
        ('pink', 'Pink'),
        ('purple', 'Purple'),
        ('orange', 'Orange'),
        ('brown', 'Brown'),
        ('grey', 'Grey'),
        ('multi', 'Multi'),
        ('other', 'Other'), 
    ]
    name = models.CharField(max_length=200)
    discription = models.TextField(null=True, blank=True)
    color = models.CharField(max_length=200,choices=color_choices)
    stock = models.IntegerField()
    marketPrice = models.FloatField()
    sellingPrice = models.FloatField()
    images = models.ManyToManyField(image, blank=True)
    
    def __str__(self):
        return self.name

class OrderItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, null=True)
    quantity = models.IntegerField(default=1)
    date_added = models.DateTimeField(auto_now_add=True)

    @property
    def get_total(self)->float:
        total = self.product.sellingPrice * self.quantity
        return total    
    
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
