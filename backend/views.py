from django.shortcuts import render
from django.contrib.auth import aget_user, alogin, alogout, aauthenticate
from django.http import (
    HttpRequest,
    HttpResponse,
    HttpResponseRedirect,
    HttpResponseBadRequest,
    JsonResponse,
)
from django.views.decorators.http import require_http_methods
from django.views.generic import View

from backend.models import Task


@require_http_methods(["GET"])
async def home(request: HttpRequest) -> HttpResponse:
    user = await aget_user(request)
    if not user.is_authenticated:
        return HttpResponseRedirect("/accounts/login/")

    return render(
        template_name="home.html",
        request=request,
        context={},
    )


@require_http_methods(["GET"])
async def todo(request: HttpRequest) -> HttpResponse:
    user = await aget_user(request)
    if not user.is_authenticated:
        return HttpResponseRedirect("/accounts/login/")

    return render(
        template_name="home.html",
        request=request,
        context={},
    )


class NewTodo(View):
    async def get(self, request: HttpRequest) -> HttpResponse:
        user = await aget_user(request)
        if not user.is_authenticated:
            return HttpResponseRedirect("/accounts/login/")

        return render(
            template_name="home.html",
            request=request,
            context={},
        )

    async def post(self, request: HttpRequest) -> HttpResponse:
        if "description" not in request.POST:
            return HttpResponseBadRequest()

        description = request.POST["description"]
        new_task = Task(
            description=description,
        )

        await new_task.asave()
        return HttpResponseRedirect("/upcoming/")


@require_http_methods(["GET"])
async def upcoming(request: HttpRequest) -> HttpResponse:
    user = await aget_user(request)
    if not user.is_authenticated:
        return HttpResponseRedirect("/accounts/login/")

    return render(
        template_name="home.html",
        request=request,
        context={},
    )


@require_http_methods(["GET"])
async def current_user(request):
    user = await aget_user(request)
    if not user.is_authenticated:
        return JsonResponse([], safe=False)
    return JsonResponse([{"name": user, "email": user.email}], safe=False)


# marked as login_required, trust me bro
class CurrentTasks(View):
    async def get(self, request: HttpRequest) -> HttpResponse:
        user = await aget_user(request)
        try:
            queryset = Task.objects.filter(
                is_current=True,
                owner_id=user,
            )
            tasks = []
            async for task in queryset:
                tasks.append(
                    {
                        "description": task.description,
                        "completed_at": task.completed_at,
                        "id": task.id,
                    }
                )
            return JsonResponse(tasks, safe=False)
        except Exception as err:
            print(err)
            return JsonResponse([], safe=False)


# marked as login_required, trust me bro
class UpcomingTasks(View):
    async def get(self, request: HttpRequest) -> HttpResponse:
        user = await aget_user(request)
        try:
            queryset = Task.objects.filter(
                is_current=False,
                is_completed=None,
                owner_id=user,
            )
            tasks = []
            async for task in queryset:
                tasks.append(
                    {
                        "description": task.description,
                        "completed_at": task.completed_at,
                        "id": task.id,
                    }
                )
            return JsonResponse(tasks, safe=False)
        except Exception as err:
            print(err)
            return JsonResponse([], safe=False)


class Login(View):
    async def get(self, request: HttpRequest) -> HttpResponse:
        user = await aget_user(request)
        if user.is_authenticated:
            return HttpResponseRedirect("/")
        return render(
            template_name="home.html",
            request=request,
            context={},
        )

    async def post(self, request):
        if "username" not in request.POST or "password" not in request.POST:
            return HttpResponseBadRequest()

        user = await aauthenticate(
            username=request.POST["username"],
            password=request.POST["password"],
        )
        if user is None:
            user = await aget_user(request)
            return render(
                template_name="home.html",
                request=request,
                context={"page_data": {"errorMessage": "Incorrect email or password!"}},
            )
        else:
            await alogin(request, user)
            return HttpResponseRedirect("/")


class Logout(View):
    async def post(self, request):
        user = await aget_user(request)
        if user.is_authenticated:
            await alogout(request=request)
        return HttpResponseRedirect("/")
