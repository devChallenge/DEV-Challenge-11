from django.conf.urls import url

from .views import (
    EmployeeRegisterViewSet, AreaAssignmentsViewSet, EmployeeStatusResetViewSet
)


urlpatterns = [
    url(
        r'register',
        EmployeeRegisterViewSet.as_view(),
        name='employee_register'
    ),
    url(r'call', AreaAssignmentsViewSet.as_view(), name='area_call'),
    url(r'reset', EmployeeStatusResetViewSet.as_view(), name='employee_reset'),
]
