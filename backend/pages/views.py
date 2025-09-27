from rest_framework import viewsets, generics
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response


from .serializers import (
    HeroBannerSerializer,
    PromoBannerSerializer,
    ServiceSerializer,
    CategoryMiniSerializer,
    ProductMiniSerializer,
    FooterSerializer,
    PageSerializer,
    NewsletterTextSerializer,
    AboutPageSerializer
)
from .models import HeroBanner, PromoBanner, Service, NewsletterText, Footer, Page, AboutPage
from products.models import Category, Product


class HomeView(generics.GenericAPIView):
    permission_classes = [AllowAny]  # 👈 Anyone can access

    def get(self, request, *args, **kwargs):
        hero_banners = HeroBanner.objects.all().order_by("order")
        categories = Category.objects.all()
        top_rated_products = Product.objects.all()[:8]  # dummy logic
        promotions = PromoBanner.objects.all()
        services = Service.objects.all()

        return Response({
            "hero_banner": HeroBannerSerializer(hero_banners, many=True, context={"request": request}).data,
            "categories": CategoryMiniSerializer(categories, many=True).data,
            "top_rated_products": ProductMiniSerializer(top_rated_products, many=True, context={"request": request}).data,
            "promotions": PromoBannerSerializer(promotions, many=True, context={"request": request}).data,
            "services": ServiceSerializer(services, many=True, context={"request": request}).data,
        })


class FooterView(APIView):
    permission_classes = [AllowAny]   # 👈 makes it public

    def get(self, request):
        footer = Footer.objects.first()
        serializer = FooterSerializer(footer, context={"request": request})
        return Response(serializer.data)


class PageDetailView(generics.RetrieveAPIView):
    queryset = Page.objects.all()
    serializer_class = PageSerializer
    lookup_field = "slug"


class NewsletterTextViewSet(viewsets.ModelViewSet):
    queryset = NewsletterText.objects.all()
    serializer_class = NewsletterTextSerializer

class AboutPageView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        about = AboutPage.objects.first()
        serializer = AboutPageSerializer(about, context={"request": request})
        return Response(serializer.data)
