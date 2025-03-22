from django.shortcuts import render
from django.contrib.auth import aget_user, alogin, alogout, aauthenticate
from django.http import HttpRequest, HttpResponse, HttpResponseRedirect, HttpResponseBadRequest, JsonResponse
from django.views.decorators.http import require_http_methods
from django.views.generic import View

# Create your views here.
def home(request):
    return render(request, 'home.html', {})

@require_http_methods(['GET'])
async def current_user(request):
    user = await aget_user(request)
    if not user.is_authenticated:
        return JsonResponse([], safe=False);
    return JsonResponse([{
        "name": user,
        "email": user.email
    }], safe=False)

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
        if not 'username' in request.POST or not 'password' in request.POST:
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
                context={},
            )
        else:
            await alogin(request, user)
            return HttpResponseRedirect('/')

class Logout(View):
    async def post(self, request):
        user = await aget_user(request)
        if user.is_authenticated:
            await alogout(request=request)
        return HttpResponseRedirect('/')
