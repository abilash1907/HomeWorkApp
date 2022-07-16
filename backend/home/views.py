from django.shortcuts import render

# Create your views here.
from .serializers import HomeSerializer
from .models import Homework
from rest_framework import viewsets
from django.views.decorators.csrf import csrf_exempt,csrf_protect
from rest_framework.decorators import api_view
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import status
def front(request):
    context = { }
    return render(request, 'index.html', context)


@api_view(['GET','POST'])

def post(request):
    parser_classes = (MultiPartParser, FormParser)
    if request.method == 'GET':
        note = Homework.objects.all()
        serializer = HomeSerializer(note, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        
        serializer = HomeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['DELETE','PUT'])
def post_delete(request,pk):
    try:
        post=Homework.objects.get(pk=pk)
    except Homework.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    if request.method=='DELETE':
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == 'PUT':
        serializer = HomeSerializer(post, data=request.data,context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
