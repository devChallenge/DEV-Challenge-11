from rest_framework.reverse import reverse
from rest_framework.test import APITestCase
from rest_framework import status

from ..models import Area, Employee


class EmployeeRegisterViewSetTest(APITestCase):
    """
    Tests for EmployeeRegisterViewSet
    """
    def test_employee_register(self):
        self.assertEqual(Area.objects.count(), 0)
        self.assertEqual(Employee.objects.count(), 0)

        response = self.client.get(
            '{0}?name=user1&area=bills&area=contracts'.format(
                reverse('employee_register')
            )
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data, 'WELCOME')

        self.assertEqual(Area.objects.count(), 2)
        self.assertEqual(Area.objects.filter(name='bills').count(), 1)
        self.assertEqual(Area.objects.filter(name='contracts').count(), 1)

        employee = Employee.objects.get(name='user1')
        self.assertEqual(employee.area.count(), 2)

        self.assertEqual(Employee.objects.count(), 1)
        self.assertEqual(Employee.objects.filter(name='user1').count(), 1)

        # employee update area
        response = self.client.get(
            '{0}?name=user1&area=leases'.format(
                reverse('employee_register')
            )
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        employee = Employee.objects.get(name='user1')
        self.assertEqual(employee.area.count(), 1)

        self.assertEqual(Area.objects.count(), 3)
        self.assertEqual(Area.objects.filter(name='leases').count(), 1)

    def test_without_data(self):
        response = self.client.get(reverse('employee_register'))
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class AreaAssignmentsViewSetTest(APITestCase):
    """
    Tests for AreaAssignmentsViewSetTest
    """
    url = reverse('area_call')

    def setUp(self):
        area1 = Area.objects.create(name='bills')
        area2 = Area.objects.create(name='leases')
        area3 = Area.objects.create(name='contracts')

        self.user1 = Employee.objects.create(name='user1')
        self.user1.area.add(area1, area2)

        self.user2 = Employee.objects.create(name='user2')
        self.user2.area.add(area1)
        self.user2.area.add(area2)
        self.user2.area.add(area3)

    def test_without_data(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_area_sort(self):
        response = self.client.get(
            '{0}?area=bills&area=leases'.format(self.url)
        )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['assignments'][0]['area'], 'bills')
        self.assertEqual(response.data['assignments'][-1]['area'], 'leases')

        response = self.client.get(
            '{0}?area=leases&area=bills'.format(self.url)
        )
        self.assertEqual(response.data['assignments'][0]['area'], 'leases')
        self.assertEqual(response.data['assignments'][-1]['area'], 'bills')

    def test_employees_sort(self):
        # employees must sorted by their area count (ASC)
        response = self.client.get(
            '{0}?area=bills&area=leases&area=contracts'.format(self.url)
        )
        area = list(filter(
            lambda x: x['area'] == 'bills', response.data['assignments']
        ))
        self.assertEqual(area[0]['employee'], 'user1')
        self.assertEqual(area[1]['employee'], 'user2')

    def test_change_status(self):
        self.client.get(
            '{0}?area=bills&area=leases&area=contracts'.format(self.url)
        )
        self.assertEqual(Employee.objects.filter(is_busy=False).count(), 0)


class EmployeeStatusResetViewSetTest(APITestCase):
    """
    Tests for EmployeeStatusResetViewSet
    """
    def setUp(self):
        area = Area.objects.create(name='bills')
        employee = Employee.objects.create(name='user1', is_busy=True)
        employee.area.add(area)

    def test_reset(self):
        response = self.client.get(reverse('employee_reset'))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertFalse(Employee.objects.get(name='user1').is_busy)
