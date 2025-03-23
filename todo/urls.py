from django.contrib import admin
from django.urls import path, include
from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth.decorators import login_required

from backend.views import (
    CurrentTasks,
    NewTodo,
    UpcomingTasks,
    home,
    current_user,
    Login,
    Logout,
    todo,
    upcoming,
)
from todo.settings import DEBUG

urlpatterns = [
    path("admin/", admin.site.urls),
    path("current-user/", current_user),
    path("accounts/login/", ensure_csrf_cookie(Login.as_view())),
    path("accounts/logout/", ensure_csrf_cookie(Logout.as_view())),
    path("api/tasks/current/", login_required(CurrentTasks.as_view())),
    path("api/tasks/upcoming/", login_required(UpcomingTasks.as_view())),
    path("todo/", login_required(todo)),
    path("todo/new/", login_required(NewTodo.as_view())),
    path("upcoming/", login_required(upcoming)),
    path("", home),
]

if DEBUG:
    urlpatterns += [
        path("__reload__/", include("django_browser_reload.urls")),
    ]
