from django.db import models

# Create your models here.


class MainCategory(models.Model):
    maincategoryname = models.CharField(max_length=70, blank=False, default='')
    icon = models.ImageField(upload_to='static/')

class SubCategory(models.Model):
    mainCategory = models.ForeignKey(MainCategory, on_delete=models.CASCADE)
    subcategoryname = models.CharField(max_length=70, blank=False, default='')
    subcategoryicon = models.ImageField(upload_to='static/')

class Brand(models.Model):
    brandname = models.CharField(max_length=70, blank=False, default='')
    brandicon = models.ImageField(upload_to='static/')
    
class Product(models.Model):
    mainCategory = models.ForeignKey(MainCategory, on_delete=models.CASCADE)
    subCategory = models.ForeignKey(SubCategory, on_delete=models.CASCADE)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)
    productname = models.CharField(max_length=70, blank=False, default='')
    description = models.CharField(max_length=100, blank=False, default='')
    producticon = models.ImageField(upload_to='static/')
    
class ProductDetail(models.Model):
    mainCategory = models.ForeignKey(MainCategory, on_delete=models.CASCADE)
    subCategory = models.ForeignKey(SubCategory, on_delete=models.CASCADE)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    subproductname = models.CharField(max_length=70, blank=False, default='')
    description = models.CharField(max_length=100, blank=False, default='')
    quntity=models.BigIntegerField(blank=False)
    price=models.BigIntegerField(blank=False)
    colour = models.CharField(max_length=70, blank=False, default='')
    size = models.CharField(max_length=70, blank=False, default='')
    offerprice=models.BigIntegerField(blank=False)
    offertype=models.CharField(max_length=50,blank=False,default="")
    picture = models.TextField(default="")
    
class Banner(models.Model):
   bannername=models.CharField(max_length=70,blank=False,default="") 
   bannericon=models.TextField(default="")  

class AdminLogin(models.Model):
    adminname=models.CharField(max_length=70,blank=False,default="")
    mobileno=models.CharField(max_length=70,blank=False,default="",unique=True)
    email=models.CharField(max_length=70,blank=False,default="",unique=True)
    password = models.CharField(max_length=70, blank=False, default='')
    picture = models.CharField(max_length=70, blank=False, default='')

class Users(models.Model):
    mobileno = models.CharField(max_length=15, blank=False, primary_key=True)
    emailid = models.CharField(max_length=100, blank=False, unique=True)
    firstname = models.CharField(max_length=70, blank=False, default='')
    lastname = models.CharField(max_length=70, blank=False, default='')
    password = models.CharField(max_length=70, blank=False, default='')
    dob = models.CharField(max_length=70, blank=False, default='')

class UserAddress(models.Model):
    mobileno = models.ForeignKey(Users, on_delete=models.CASCADE)
    country = models.CharField(max_length=70, blank=False, default='')
    address = models.CharField(max_length=70, blank=False, default='')
    city = models.CharField(max_length=70, blank=False, default='')
    postcode = models.CharField(max_length=70, blank=False, default='')
