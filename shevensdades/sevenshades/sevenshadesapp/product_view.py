from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from sevenshadesapp.models import Product,SubCategory
from sevenshadesapp.serializer import ProductSerializer
from sevenshadesapp.serializer import ProductGetSerializer
from sevenshadesapp.serializer import SubCategoryGetSerializer
from rest_framework.decorators import api_view



@api_view(['GET', 'POST', 'DELETE'])
def Product_Submit(request):
    try:
        if request.method == 'POST':
            product_serializer = ProductSerializer(data=request.data)
            print(request.data)
            if (product_serializer.is_valid()):
                product_serializer.save()
                return JsonResponse({"message": 'Product Submitted Successfully', "status": True}, safe=True)
            else:
                return JsonResponse({"message": 'Fail to  submit Product', "status": False}, safe=False)
    except Exception as e:
        print("Error submit:", e)
        return JsonResponse({"message": 'Fail to  submit product', "status": False}, safe=False)


@api_view(['GET', 'POST', 'DELETE'])
def Product_List(request):
    try:
        if request.method == 'GET':
            product_list = Product.objects.all()
            product_serializer_list=ProductGetSerializer(product_list,many=True)
            print(request.data)
            return JsonResponse({"data": product_serializer_list.data, "status": True}, safe=False)
        else:
         return JsonResponse({"data": [], "status": False}, safe=False)
    except Exception as e:
      print("Error submit:", e)
      return JsonResponse({"data": [], "status": False}, safe=False)


@api_view(['GET', 'POST', 'DELETE'])
def EditProduct_Icon(request):
    try:
        if request.method == 'POST':
            product_icon = Product.objects.get(pk=request.data['id'])
            product_icon.producticon=request.data['producticon']
            product_icon.save()
            return JsonResponse({"message": 'Product Icon Update Successfully', "status": True}, safe=False)
        else:
            return JsonResponse({"message": 'Fail to Update Product Icon ', "status": False}, safe=False)
    except Exception as e:
        print("Error submit:", e)
        return JsonResponse({"message": 'Fail to Update product Icon ', "status": False}, safe=False)


@api_view(['GET', 'POST', 'DELETE'])
def EditProduct_Data(request):
    try:
        if request.method == 'POST':
            product_data = Product.objects.get(pk=request.data['id'])
            product_data.productname=request.data['productname']
            product_data.description=request.data['description']
            product_data.mainCategory_id=request.data['mainCategory']
            product_data.subCategory_id=request.data['subCategory']
            product_data.brand_id=request.data['brand']
            product_data.save()
            return JsonResponse({"message": 'Product Data Update Successfully', "status": True}, safe=False)
        else:
            return JsonResponse({"message": 'Fail to Update Product Data ', "status": False}, safe=False)
    except Exception as e:
        print("Error submit:", e)
        return JsonResponse({"message": 'Fail to Update product data', "status": False}, safe=False)





@api_view(['GET', 'POST', 'DELETE'])
def Delete_Product(request):
    try:
        if request.method == 'POST':
            product_data = Product.objects.get(pk=request.data['id'])
            product_data.delete()
            return JsonResponse({"message": 'Product Data Delete Successfully', "status": True}, safe=False)
        else:
            return JsonResponse({"message": 'Fail to Delete Product Data ', "status": False}, safe=False)
    except Exception as e:
        print("Error submit:", e)
        return JsonResponse({"message": 'Fail to delete product data ', "status": False}, safe=False)



@api_view(['GET', 'POST', 'DELETE'])
def SubCat_list_by_MainCatId(request):
    try:
        if request.method == 'POST':
            maincategoryid=request.data['mainCategory']
            # print("aaaaaaaaa",maincategoryid)
           
            subcategory_list=SubCategory.objects.all().filter(mainCategory_id=maincategoryid)
            subcategory_serializer_list=SubCategoryGetSerializer(subcategory_list,many=True)
            # print(subcategory_serializer_list.data)
            return JsonResponse({"data":subcategory_serializer_list.data,"status":True},safe=False)
        else:
            print("False")
            return JsonResponse({"data":[],"status":False},safe=False)
    except Exception as e:
       print ("Error submit:",e)
       return JsonResponse({"data":[],"status":False},safe=False)
       
            
            
            
            
            
         