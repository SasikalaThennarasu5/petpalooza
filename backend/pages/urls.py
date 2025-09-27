from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import HomeView, PageDetailView, FooterView, NewsletterTextViewSet, AboutPageView

router = DefaultRouter()
router.register("newsletter", NewsletterTextViewSet)

urlpatterns = [
    path("home/", HomeView.as_view(), name="home"),
    path("about/", AboutPageView.as_view(), name="about"),
    path("footer/", FooterView.as_view(), name="footer"),
    path("<slug:slug>/", PageDetailView.as_view(), name="page-detail"),
    path("", include(router.urls)),
]
