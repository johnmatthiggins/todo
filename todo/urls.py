from django.contrib import admin
from django.urls import path, include

from backend.views import home, current_user
from todo.settings import DEBUG

urlpatterns = [
    path("admin/", admin.site.urls),
    path("current-user/", current_user),
    path("", home),
]

if DEBUG:
    urlpatterns += [
        path("__reload__/", include("django_browser_reload.urls")),
    ]
