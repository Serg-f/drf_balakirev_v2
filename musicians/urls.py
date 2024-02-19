from django.urls import path

from musicians.views import MusicianAPIListView

urlpatterns = [
    path('musicians/', MusicianAPIListView.as_view()),
]