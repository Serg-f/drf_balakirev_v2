from django.urls import path

from musicians.views import MusicianListAPIView, MusicianAPIView

urlpatterns = [
    path('musicians/', MusicianListAPIView.as_view(), name='musicians'),
    path('musicians/<int:pk>/', MusicianAPIView.as_view(), name='musician'),
]