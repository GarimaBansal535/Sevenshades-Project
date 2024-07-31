from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from sevenshadesapp.models import SubCategory
from sevenshadesapp.serializer import SubCategorySerializer
from sevenshadesapp.serializer import SubCategoryGetSerializer
from rest_framework.decorators import api_view


@api_view(['GET', 'POST', 'DELETE'])
def SubCategory_Submit(request):
    try:
        if request.method == 'POST':
            subcategory_serializer = SubCategorySerializer(data=request.data)
            print(subcategory_serializer)
            if (subcategory_serializer.is_valid()):
                subcategory_serializer.save()
                return JsonResponse({"message": 'SubCategory Submitted Successfully', "status": True}, safe=False)
            else:
                return JsonResponse({"message": 'Fail to  submit SubCategory', "status": False}, safe=False)
    except Exception as e:
        print("Error submit:", e)
        return JsonResponse({"message": 'Fail to  submit SubCategory', "status": False}, safe=False)

@api_view(['GET', 'POST', 'DELETE'])
def SubCategory_List(request):
  try:
    if request.method == 'GET':
        subcategory_list = SubCategory.objects.all()
        subcategory_serializer_list = SubCategoryGetSerializer(subcategory_list, many=True)
        print(subcategory_serializer_list.data)
        return JsonResponse({"data": subcategory_serializer_list.data, "status": True}, safe=False)
    else:
        return JsonResponse({"data": [], "status": False}, safe=False)
  except Exception as e:
      print("Error submit:", e)
      return JsonResponse({"data": [], "status": False}, safe=False)


@api_view(['GET', 'POST', 'DELETE'])
def DeleteSubCategory_Data(request):
    try:
        if request.method == 'POST':
            subcategory_data = SubCategory.objects.get(pk=request.data['id'])
            subcategory_data.delete()
            
            return JsonResponse({"message": 'SubCategory Data Deleted Successfully', "status": True}, safe=False)
        else:
            return JsonResponse({"message": 'Fail to Delete SubCategory data ', "status": False}, safe=False)
    except Exception as e:
        print("Error submit:", e)
        return JsonResponse({"message": 'Fail to Delete SubCategory data ', "status": False}, safe=False)




@api_view(['GET', 'POST', 'DELETE'])
def EditSubCategory_Data(request):

    try:
        if request.method == 'POST':
            subcategory_data = SubCategory.objects.get(pk=request.data['id'])
            subcategory_data.mainCategory_id = request.data['mainCategory']
            subcategory_data.subcategoryname = request.data['subcategoryname']
            print(subcategory_data.mainCategory_id)
            subcategory_data.save()
            return JsonResponse({"message": 'SubCategory Data Update Successfully', "status": True}, safe=False)
        else:
            return JsonResponse({"message": 'Fail to Update SubCategory data ', "status": False}, safe=False)
    except Exception as e:
        print("Error submit:", e)
        return JsonResponse({"message": 'Fail to Update SubCategory data ', "status": False}, safe=False)



@api_view(['GET', 'POST', 'DELETE'])
def EditSubCategory_Icon(request):

    try:
        if request.method == 'POST':
            subcategory_data = SubCategory.objects.get(pk=request.data['id'])
            subcategory_data.subcategoryicon = request.data['subcategoryicon']
          
            subcategory_data.save()
            return JsonResponse({"message": 'SubCategory Icon Update Successfully', "status": True}, safe=False)
        else:
            return JsonResponse({"message": 'Fail to Update SubCategory Icon ', "status": False}, safe=False)
    except Exception as e:
        print("Error submit:", e)
        return JsonResponse({"message": 'Fail to Update SubCategory Icon ', "status": False}, safe=False)
