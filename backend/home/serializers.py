from rest_framework import serializers

from .models import Homework

class HomeSerializer(serializers.ModelSerializer):
    class Meta:
        model=Homework
        fields='__all__'