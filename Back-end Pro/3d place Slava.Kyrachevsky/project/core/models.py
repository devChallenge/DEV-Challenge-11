from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


class Area(models.Model):
    """
    Employee area model
    """
    name = models.CharField('name', max_length=50, unique=True)

    class Meta:
        verbose_name = verbose_name_plural = 'area'
        ordering = ('name',)

    def __str__(self):
        return self.name


class Employee(models.Model):
    """
    Employee model
    """
    name = models.CharField('name', max_length=100, unique=True)
    area = models.ManyToManyField(
        Area,
        verbose_name='area',
        related_name='area'
    )
    area_count = models.IntegerField(default=0, editable=False)
    is_busy = models.BooleanField('busy', default=False)

    class Meta:
        verbose_name = 'employee'
        verbose_name_plural = 'employees'

    def __str__(self):
        return self.name


@receiver(post_save, sender=Employee)
def handle_employee_area_count(sender, instance, created=False, **kwargs):
    """
    Data denormalization
    """
    Employee.objects.filter(pk=instance.pk)\
                    .update(area_count=instance.area.count())
