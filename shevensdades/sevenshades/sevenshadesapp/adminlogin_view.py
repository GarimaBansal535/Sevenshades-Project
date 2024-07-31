from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from sevenshadesapp.models import AdminLogin
from sevenshadesapp.serializer import AdminLoginSerializer
from rest_framework.decorators import api_view

# Create your views here.
@api_view(['GET', 'POST', 'DELETE'])
def Check_Adminlogin(request):

    try:
        if request.method == 'POST':
            emailid=request.data['email']
            pwd=request.data['password']
            print("eeeeee",emailid)
            adminlogin=AdminLogin.objects.all().filter(email=emailid,password=pwd)
            
            adminlogin_serializer = AdminLoginSerializer(adminlogin,many=True)
            

            if (len(adminlogin_serializer.data)==1):

                
                return JsonResponse({"data":adminlogin_serializer.data,"message": 'Successfully', "status": True}, safe=False)
            else:
                return JsonResponse({"data":[],"message": 'Fail', "status": False}, safe=False)
    except Exception as e:
        print("Error submit:", e)
        return JsonResponse({"message": 'Server Error ', "status": False}, safe=False)
    