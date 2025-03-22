from django.shortcuts import render
from django.contrib.auth import aget_user
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods

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
