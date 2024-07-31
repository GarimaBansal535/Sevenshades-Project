from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from sevenshadesapp.models import Product,ProductDetail,Brand
from sevenshadesapp.serializer import ProductDetailSerializer
from sevenshadesapp.serializer import ProductDetailGetSerializer
from sevenshadesapp.serializer import ProductGetSerializer
from rest_framework.decorators import api_view
from django.core.files.storage import default_storage

def Upload_files(files):
    picturename=[]
    for Upload_files in files.getlist('icon'):
     filepath=default_storage.save('static/'+Upload_files.name,Upload_files)
     print('fileeee',filepath)
     picturename.append(Upload_files.name)
    return ','.join(picturename)     
     
     



@api_view(['GET', 'POST', 'DELETE'])
def P_Submit(request):
    try:
        if request.method == 'POST':
            
            filenames=Upload_files(request.FILES)
            request.data['picture']=filenames
            productdetail_serializer = ProductDetailSerializer(data=request.data)
            if (productdetail_serializer.is_valid()):
                productdetail_serializer.save()
                return JsonResponse({"message": 'Product Detail Submitted Successfully', "status": True}, safe=True)
            else:
                return JsonResponse({"message": 'Fail to  submit Product detail', "status": False}, safe=False)
    except Exception as e:
        print("Error submit:", e)
        return JsonResponse({"message": 'Fail to  submit product Detail', "status": False}, safe=False)


@api_view(['GET', 'POST', 'DELETE'])
def ProductDetail_List(request):
    try:
        if request.method == 'GET':
            product_list = ProductDetail.objects.all()
            product_serializer_list=ProductDetailGetSerializer(product_list,many=True)
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
            productdetail_data=ProductDetail.objects.get(pk=request.data['id']) 
            productdetail_data.maincategory_id=request.data['mainCategory']
            productdetail_data.subcategory_id=request.data['subCategory']
            productdetail_data.brand_id=request.data['brand']
            productdetail_data.product_id=request.data['product']
            productdetail_data.subproductname=request.data['subproductname']
            productdetail_data.description=request.data['description']
            productdetail_data.quntity=request.data['quntity']
            productdetail_data.price=request.data['price']
            productdetail_data.offerprice=request.data['offerprice']
            productdetail_data.offertype=request.data['offertype']


            productdetail_data.save()
            
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
def P_List_by_SCat(request):
    try:
        if request.method == 'POST':
            subCategoryid=request.data['subCategory']
            productdetail_list=Product.objects.all().filter(subCategory_id=subCategoryid)
            productdetail_serializer_list=ProductGetSerializer(productdetail_list,many=True)
           
            return JsonResponse({"data":productdetail_serializer_list.data,"status":True},safe=False)
        else:
           return JsonResponse({"data":[],"status":False},safe=False)
    except Exception as e:
       print ("Error submit:",e)
       return JsonResponse({"data":[],"status":False},safe=False)
       
@api_view(['GET', 'POST', 'DELETE'])
def Brand_List_by_P(request):
    try:
        if request.method == 'POST':
            productid=request.data['product']
            brand_list=Product.objects.all().filter(id=productid)
            brand_serializer_list=ProductGetSerializer(brand_list,many=True)
            print(brand_serializer_list.data)
            return JsonResponse({"data":brand_serializer_list.data,"status":True},safe=False)
        else:
           return JsonResponse({"data":[],"status":False},safe=False)
    except Exception as e:
       print ("Error submit:",e)
       return JsonResponse({"data":[],"status":False},safe=False)
                  
            

@api_view(['GET','POST','DELETE'])
def ProductDetail_List(request):  # This API is called by "axios", result is returned by "axios"
    
    try:
        if request.method=='GET':
            productdetail_list=ProductDetail.objects.all() 
            productdetail_serializer_list=ProductDetailGetSerializer(productdetail_list,many=True)
            return JsonResponse({"data":productdetail_serializer_list.data,"status":True},safe=False)

        else:
            return JsonResponse({"data":[],"status":False},safe=False)
    
    except Exception as e:
        print("Error submit:",e)
        return JsonResponse({"data":[],"status":False},safe=False)

@api_view(['GET','POST','DELETE'])
def EditProductDetail_Icon(request):  # This API is called by "axios", result is returned by "axios"
    
    try:
        if request.method=='POST':
            productdetail_data=ProductDetail.objects.get(pk=request.data['id'])
            productdetail_data.picture=request.data['picture'] #new icon is set/updated to 'icon' field of database
            productdetail_data.save()
            return JsonResponse({"message":'Product Detail Icon Upated Successfully',"status":True},safe=False) 
        else:
            return JsonResponse({"message":'Fail To update icon',"status":False},safe=False)
    
    except Exception as e:
        print("Error submit:",e)
        return JsonResponse({"message":'Fail To update product detail Icon',"status":False},safe=False)

@api_view(['GET','POST','DELETE'])
def EditProductDetail_Data(request):    
    try:
        if request.method=='POST':
            productdetail_data=ProductDetail.objects.get(pk=request.data['id']) 
            productdetail_data.mainCategory_id=request.data['mainCategory']
            productdetail_data.subCategory_id=request.data['subCategory']
            productdetail_data.brand_id=request.data['brand']
            productdetail_data.product_id=request.data['product']
            productdetail_data.productsubname=request.data['productsubname']
            productdetail_data.description=request.data['description']
            productdetail_data.quntity=request.data['quntity']
            productdetail_data.price=request.data['price']
            productdetail_data.offerprice=request.data['offerprice']
            productdetail_data.offertype=request.data['offertype']

            productdetail_data.save()
            return JsonResponse({"message":'Product Detail Data Upated Successfully',"status":True},safe=False)
        else:
            return JsonResponse({"message":'Fail To update Data',"status":False},safe=False)
    
    except Exception as e:
        print("Error submit:",e)
        return JsonResponse({"message":'Fail To update Product Detail Data',"status":False},safe=False)

@api_view(['GET','POST','DELETE'])
def DeleteProductDetail_Data(request):
    
    try:
        if request.method=='POST':
            productdetail_data=ProductDetail.objects.get(pk=request.data['id'])
            productdetail_data.delete()
            return JsonResponse({"message":'Product Detail Deleted Successfully',"status":True},safe=False)
        else:
            return JsonResponse({"message":'Fail To delete Data',"status":False},safe=False)
    
    except Exception as e:
        print("Error submit:",e)
        return JsonResponse({"message":'Fail To delete Product Detail Data',"status":False},safe=False) 


            
            
            
            
         