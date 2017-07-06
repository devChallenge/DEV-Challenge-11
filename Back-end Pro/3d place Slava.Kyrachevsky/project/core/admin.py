from django.contrib import admin

from .models import Area, Employee


@admin.register(Area)
class AreaAdmin(admin.ModelAdmin):
    pass


@admin.register(Employee)
class EmployeeAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_busy')
    list_filter = ('is_busy',)
    filter_horizontal = ('area',)
