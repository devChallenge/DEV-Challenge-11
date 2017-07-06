from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response

from django.db.models import F

from .serializers import (
    EmployeeRegistrationSerializer, EmployeeResetSerializer
)
from ..models import Employee, Area


class EmployeeRegisterViewSet(generics.CreateAPIView):
    """
    API endpoint that register new employee
    """
    serializer_class = EmployeeRegistrationSerializer

    def get(self, request, *args, **kwargs):
        """
        By default method create calling by method post.
        But we want create instance by method get
        """
        return self.create(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        if not request.GET.get('name') and not request.GET.getlist('area'):
            return Response(status=status.HTTP_403_FORBIDDEN)

        area_obj = []
        for area in request.GET.getlist('area'):
            obj, created = Area.objects.get_or_create(name=area.strip())
            area_obj.append(obj)

        employee, created = Employee.objects.get_or_create(
            name=request.GET['name'].strip()
        )

        employee.area.clear()
        [employee.area.add(x) for x in area_obj]
        employee.save()

        return Response('WELCOME', status=status.HTTP_200_OK)


class AreaAssignmentsViewSet(generics.ListAPIView):
    """
    API endpoint that list area and employees.
    """
    def list(self, request, *args, **kwargs):
        if not request.GET.getlist('area'):
            return Response(status=status.HTTP_403_FORBIDDEN)

        data = Area.objects.filter(
            name__in=request.GET.getlist('area'), area__is_busy=False
        ).prefetch_related(
            'area'
        ).annotate(
            area_name=F('name'),
            employee=F('area__name'),
            employee_pk=F('area__pk')
        ).values(
            'area_name', 'employee', 'area__area_count', 'employee_pk'
        ).order_by(
            'area_name', 'area__area_count'
        )

        # data sort by area (from GET params)
        data_sorted = []
        for area in request.GET.getlist('area'):
            data_sorted += list(filter(lambda x: x['area_name'] == area, data))

        response_data = {
            'totalAssignments': len(
                list(filter(lambda x: x['employee'] is not None, data_sorted))
            ),
            'assignments': [
                {'area': x['area_name'], 'employee': x['employee']}
                for x in data_sorted
            ]
        }

        # murk as busy
        Employee.objects.filter(
            pk__in=[x['employee_pk'] for x in data_sorted]
        ).update(is_busy=True)

        if response_data['totalAssignments'] == 0:
            return Response('')

        return Response(response_data)


class EmployeeStatusResetViewSet(generics.UpdateAPIView):
    """
    API endpoint that update employees status to "not busy"
    """
    serializer_class = EmployeeResetSerializer

    def get(self, request, *args, **kwargs):
        """
        By default method update calling by method put.
        But we want create instance by method get
        """
        return self.update(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        Employee.objects.update(is_busy=False)
        return Response(status=status.HTTP_200_OK)
