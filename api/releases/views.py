from django.http import HttpResponse


def index(request):
    return HttpResponse("Release base API")
