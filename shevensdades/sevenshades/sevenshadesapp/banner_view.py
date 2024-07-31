from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser
from rest_framework import status
from sevenshadesapp.models import Banner
from sevenshadesapp.serializer import BannerSerializer
from rest_framework.decorators import api_view
from django.core.files.storage import default_storage

# Create your views here.

def Upload_Files(files):
    iconname=[]
    for Uploaded_files in files.getlist('bannericon'):
     filepath=default_storage.save('static/'+Uploaded_files.name,Uploaded_files)
     iconname.append(Uploaded_files.name)
    return ','.join(iconname)


@api_view(['GET', 'POST', 'DELETE'])
def Banner_Submit(request):
    try:
        if request.method == 'POST':
            filenames=Upload_Files(request.FILES)
            print(filenames)
            request.data['bannericon']=filenames
            banner_serializer = BannerSerializer(data=request.data)
            if (banner_serializer.is_valid()):

                banner_serializer.save()
                return JsonResponse({"message": 'Banner Submitted Successfully', "status": True}, safe=False)
            else:
                return JsonResponse({"message": 'Fail to  submit banner', "status": False}, safe=False)
    except Exception as e:
        print("Error submit:", e)
        return JsonResponse({"message": 'Fail to  submit Banner', "status": False}, safe=False)

