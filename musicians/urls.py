from django.urls import path

from musicians.views import MusicianListAPIView, MusicianAPIView, InstrumentListAPIView, StyleListAPIView

urlpatterns = [
    path('musicians/', MusicianListAPIView.as_view(), name='musicians'),
    path('musicians/<int:pk>/', MusicianAPIView.as_view(), name='musician'),
    path('instruments/', InstrumentListAPIView.as_view(), name='instruments'),
    path('styles/', StyleListAPIView.as_view(), name='styles'),
]
