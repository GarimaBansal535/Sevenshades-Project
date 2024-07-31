from rest_framework import serializers
from sevenshadesapp.models import MainCategory
from sevenshadesapp.models import SubCategory
from sevenshadesapp.models import Brand
from sevenshadesapp.models import Product 
from sevenshadesapp.models import ProductDetail 
from sevenshadesapp.models import Banner
from sevenshadesapp.models import AdminLogin
from sevenshadesapp.models import Users
from sevenshadesapp.models import UserAddress

class MainCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = MainCategory
        fields = '__all__'


class SubCategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = SubCategory
        fields = '__all__'

class SubCategoryGetSerializer(serializers.ModelSerializer):
    mainCategory=MainCategorySerializer(many=False)
    class Meta:
        model = SubCategory
        fields = '__all__'
        
        
class BrandSerializer(serializers.ModelSerializer):

    class Meta:
        model = Brand
        fields = '__all__'

class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = '__all__'
                
class ProductGetSerializer(serializers.ModelSerializer):
    mainCategory=MainCategorySerializer(many=False)
    subCategory=SubCategorySerializer(many=False)
    brand=BrandSerializer(many=False)
    class Meta:
        model = Product
        fields = '__all__'
        
class ProductDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProductDetail
        fields = '__all__'
                
class ProductDetailGetSerializer(serializers.ModelSerializer):
    mainCategory=MainCategorySerializer(many=False)
    subCategory=SubCategorySerializer(many=False)
    brand=BrandSerializer(many=False)
    product=ProductSerializer(many=False)
    class Meta:
        model = ProductDetail
        fields = '__all__'        

class BannerSerializer(serializers.ModelSerializer):

    class Meta:
        model = Banner
        fields = '__all__'


class AdminLoginSerializer(serializers.ModelSerializer):

    class Meta:
        model = AdminLogin
        fields = '__all__'
    
class UsersSerializer(serializers.ModelSerializer):
    
    
    class Meta:
        model=Users
        fields = '__all__'   

class UserAddressSerializer(serializers.ModelSerializer):
   class Meta:
        model = UserAddress
        fields = '__all__'                

        
class UserAddressGetSerializer(serializers.ModelSerializer):
    
    mobileno=UsersSerializer(many=False)
    class Meta:
        model = UserAddress
        fields = '__all__'
        