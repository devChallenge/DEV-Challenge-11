from rest_framework import serializers

from ..models import Employee


class EmployeeRegistrationSerializer(serializers.ModelSerializer):
    """
    Employee registration serializer
    """
    class Meta:
        model = Employee
        fields = '__all__'


class EmployeeResetSerializer(serializers.ModelSerializer):
    """
    Employee status reset serializer
    """
    class Meta:
        model = Employee
        fields = ('is_busy',)
