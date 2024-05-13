from django.shortcuts import render
from django.http import HttpResponse
from . import models
from django.contrib.auth.models import Group

def home(request):
    return render(request, 'index.html')

def shop(request):
    return render(request, 'shop.html')

def makeProduct(request):
    customerGroup = Group.objects.get(name='Customer')
    customers = models.Customer.objects.all()
    for customer in customers:
        customerGroup.user_set.add(customer.user)
        
    return HttpResponse('Product Created')