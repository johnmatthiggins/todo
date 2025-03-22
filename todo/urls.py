from django.contrib import admin
from django.urls import path

from backend.views import home, current_user

urlpatterns = [
    path("admin/", admin.site.urls),
    path("current-user/", current_user),
    path("", home),
]
