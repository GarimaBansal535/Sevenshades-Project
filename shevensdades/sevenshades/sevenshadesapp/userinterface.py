from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from sevenshadesapp.models import Users,UserAddress, MainCategory,SubCategory,Brand,ProductDetail,Banner,Product
from sevenshadesapp.serializer import UserAddressSerializer,UsersSerializer,UserAddressGetSerializer, MainCategorySerializer,ProductGetSerializer,SubCategoryGetSerializer,ProductDetailGetSerializer,BannerSerializer,BrandSerializer,ProductGetSerializer
from rest_framework.decorators import api_view

# Create your views here.
@api_view(['GET', 'POST', 'DELETE'])
def User_MainCategory_List(request):

    try:
        if request.method == 'GET':
            maincategory_list = MainCategory.objects.all()
            maincategory_serializer_list = MainCategorySerializer(maincategory_list, many=True)
            return JsonResponse({"data": maincategory_serializer_list.data, "status": True}, safe=False)
        else:
            return JsonResponse({"data": [], "status": False}, safe=False)
    except Exception as e:
        print("Error submit:", e)
        return JsonResponse({"data": [], "status": False}, safe=False)



@api_view(['GET', 'POST', 'DELETE'])
def User_SubCat_list_by_MainCatId(request):
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
   
       
@api_view(['GET', 'POST', 'DELETE'])
def User_Brand_List(request):
    try:
       
        if request.method == 'POST':
            
            sid=request.data['subCategory']
            mid=request.data['mainCategory']
            product_list = Product.objects.all().filter(subCategory_id=sid,mainCategory_id=mid)
            product_serializer_list = ProductGetSerializer(product_list, many=True)
            # print('ggggggg',dict(list(product_serializer_list.data)[0]['brand']))
            finalresult=fetchData('brand',product_serializer_list.data)
            return JsonResponse({"data":finalresult, "status": True}, safe=False)
        
        else:
            return JsonResponse({"data": [], "status": False}, safe=False)
    except Exception as e:
        print("Error submit:", e)
        return JsonResponse({"data": [], "status": False}, safe=False)
    
def fetchData(feild,data):
        data=list(data)
    
        result={}
        for row in data:
            mydata=dict(row)
            record=dict(mydata[feild])
            result[record['id']]=record
            finalresult=list(result.values())
            return(finalresult)
            # print("sssss",finalresult)
            
@api_view(['GET', 'POST', 'DELETE'])
def Banner_List(request):
  
 try:
   if request.method=='GET': 
      banner_list=Banner.objects.all() 
      banner_serializer_list=BannerSerializer(banner_list,many=True) 
      
      return JsonResponse({"data":banner_serializer_list.data[0],"status":True},safe=False) 
   else:
      return JsonResponse({"data":[],"status":False},safe=False) 
 except Exception as e:
    print("Error submit:",e)
    return JsonResponse({"data":[],"status":False},safe=False)  


@api_view(['GET', 'POST', 'DELETE'])
def User_SubCategory_List(request):
  try:
    if request.method == 'GET':
        subcategory_list = SubCategory.objects.all()
        subcategory_serializer_list = SubCategoryGetSerializer(subcategory_list, many=True)
        # print(subcategory_serializer_list.data)
        return JsonResponse({"data": subcategory_serializer_list.data, "status": True}, safe=False)
    else:
        return JsonResponse({"data": [], "status": False}, safe=False)
  except Exception as e:
      print("Error submit:", e)
      return JsonResponse({"data": [], "status": False}, safe=False)


@api_view(['GET', 'POST', 'DELETE'])
def Banner_List(request):
  
 try:
   if request.method=='GET': 
      banner_list=Banner.objects.all() 
      banner_serializer_list=BannerSerializer(banner_list,many=True) 
      
      return JsonResponse({"data":banner_serializer_list.data[0],"status":True},safe=False) 
   else:
      return JsonResponse({"data":[],"status":False},safe=False) 
 except Exception as e:
    print("Error submit:",e)
    return JsonResponse({"data":[],"status":False},safe=False)


@api_view(['GET', 'POST', 'DELETE'])
def User_ProductDetail_List(request):
   
    try:
        
        if request.method == 'GET':
            product_list = ProductDetail.objects.all()
            product_serializer_list=ProductDetailGetSerializer(product_list,many=True)
            # print("ssssjjjjjjj",product_serializer_list.data)
            return JsonResponse({"data": product_serializer_list.data[0], "status": True}, safe=False)
        else:
         return JsonResponse({"data": [], "status": False}, safe=False)
    except Exception as e:
      print("Error submit:", e)
      return JsonResponse({"data": [], "status": False}, safe=False)
  
  
@api_view(['GET', 'POST', 'DELETE'])
def User_Product_List(request):
    try:
        if request.method == 'GET':
            product_list = Product.objects.all()
            product_serializer_list=ProductGetSerializer(product_list,many=True)
           
            return JsonResponse({"data": product_serializer_list.data, "status": True}, safe=False)
        else:
         return JsonResponse({"data": [], "status": False}, safe=False)
    except Exception as e:
      print("Error submit:", e)
      return JsonResponse({"data": [], "status": False}, safe=False)


@api_view(['GET', 'POST', 'DELETE'])
def All_Brand_List(request):
    try:
        if request.method == 'GET':
            brand_list = Brand.objects.all()
            brand_serializer_list = BrandSerializer(brand_list, many=True)
            # print("brand",brand_serializer_list.data)
            return JsonResponse({"data": brand_serializer_list.data, "status": True}, safe=False)
        else:
            return JsonResponse({"data": [], "status": False}, safe=False)
    except Exception as e:
        print("Error submit:", e)
        return JsonResponse({"data": [], "status": False}, safe=False)
    
    
@api_view(['GET', 'POST', 'DELETE'])
def User_P_List_by_MCat(request):
    try:
        if request.method == 'POST':
          
            mainCategoryid=request.data['mainCategory']
            productdetail_list=Product.objects.all().filter(mainCategory_id=mainCategoryid)
            productdetail_serializer_list=ProductGetSerializer(productdetail_list,many=True)
            print("ppppp",productdetail_serializer_list.data)
            return JsonResponse({"data":productdetail_serializer_list.data,"status":True},safe=False)
        else:
           return JsonResponse({"data":[],"status":False},safe=False)
    except Exception as e:
       print ("Error submit:",e)
       return JsonResponse({"data":[],"status":False},safe=False)
   
@api_view(['GET', 'POST', 'DELETE'])
def User_SubCategory_List(request):
  try:
    if request.method == 'GET':
        subcategory_list = SubCategory.objects.all()
        subcategory_serializer_list = SubCategoryGetSerializer(subcategory_list, many=True)
        # print(subcategory_serializer_list.data)
        return JsonResponse({"data": subcategory_serializer_list.data, "status": True}, safe=False)
    else:
        return JsonResponse({"data": [], "status": False}, safe=False)
  except Exception as e:
      print("Error submit:", e)
      return JsonResponse({"data": [], "status": False}, safe=False)


@api_view(['GET', 'POST', 'DELETE'])
def P_List_by_SubyCat(request):
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
       
       
@api_view(['POST'])
def Dispaly_product_by_Id(request):
    
  

     try:
        
        if request.method == 'POST':
            productid=request.data['product']
           
            productdetail_list=ProductDetail.objects.all().filter(product_id=productid)
            productdetail_serializer_list=ProductDetailGetSerializer(productdetail_list,many=True)
            # print("pppp",productdetail_serializer_list.data)
            return JsonResponse({"data":productdetail_serializer_list.data,"status":True},safe=False)
        else:
           return JsonResponse({"data":[],"status":False},safe=False)
     except Exception as e:
       print ("Error submit:",e)
       return JsonResponse({"data":[],"status":False},safe=False)
      
    
@api_view(['GET', 'POST', 'DELETE'])
def custmer_Submit(request):
    try:
        if request.method == 'POST':
            user_serializer = UsersSerializer(data=request.data)
            print("Ffffff",request.data)
            print("jjjjjjjjjjj",user_serializer)
            if (user_serializer.is_valid()):
                user_serializer.save()
                return JsonResponse({"message": 'User Regitered Successfully', "status": True}, safe=False)
            else:
                return JsonResponse({"message": 'Fail to  Regitered User', "status": False}, safe=False)
    except Exception as e:
        print("Error submit:", e)
        return JsonResponse({"message": 'Fail to  regitered user', "status": False}, safe=False)
    
    
@api_view(['GET', 'POST', 'DELETE'])
def Check_User_login(request):

    try:
        if request.method == 'POST':
            mobile=request.data['mobileno']
            pwd=request.data['password']
            print("eeeeee",mobile)
            usersignin=Users.objects.all().filter(mobileno=mobile,password=pwd)
            
            usersignin_serializer = UsersSerializer(usersignin,many=True)
            

            if (len(usersignin_serializer.data)==1):

                
                return JsonResponse({"data":usersignin_serializer.data,"message": 'Successfully', "status": True}, safe=False)
            else:
                return JsonResponse({"data":[],"message": 'Fail', "status": False}, safe=False)
    except Exception as e:
        print("Error submit:", e)
        return JsonResponse({"message": 'Server Error ', "status": False}, safe=False)
    
@api_view(['GET', 'POST', 'DELETE'])
def FetchUserAddress(request):
  
 try:
   if request.method=='POST':
     mobile=request.data['mobile']
     
     userAddress=UserAddress.objects.all().filter(mobileno=mobile)
   
     user_AddressSerializer=UserAddressGetSerializer(userAddress,many=True)
     print("Length:",len(user_AddressSerializer.data))
     if(len(user_AddressSerializer.data)>0):
      return JsonResponse({"data":user_AddressSerializer.data,"status":True},safe=False)
     else: 
      return JsonResponse({"data":[],"status":False},safe=False)  
   
   else:
      return JsonResponse({"data":[],"message":'Fail',"status":False},safe=False) 
 except Exception as e:
    print("Error submit:",e)
    return JsonResponse({"message":'Server Error',"status":False},safe=False) 
 
     
@api_view(['GET','POST','DELETE'])
def Address_Submit(request):  # This API is called by "axios", result is returned by "axios"
    try:
        print("zzzzzzzzzzzzzzzz")
        if request.method=='POST':
            address_serializer=UserAddressSerializer(data=request.data) #input data by user via 'react' is set to 'data' 

        if(address_serializer.is_valid()):  #checking data entered is valid or not
           address_serializer.save()       #then data is saved
           return JsonResponse({"message":'Address Submitted Successfully',"status":True},safe=False) 
        else:
            return JsonResponse({"message":'Fail To Submit',"status":False},safe=False)
    
    except Exception as e:
        print("Error submit:",e)
        return JsonResponse({"message":'Fail To Submit Product',"status":False},safe=False)    