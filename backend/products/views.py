from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer
from pages.serializers import ProductMiniSerializer
from django.db.models import Q
from .models import Product

# Category list
class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]

class ProductByCategoryView(generics.ListAPIView):
    serializer_class = ProductMiniSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        category_id = self.kwargs["id"]
        queryset = Product.objects.filter(category_id=category_id)

        # filters
        brand = self.request.query_params.get("brand")
        size = self.request.query_params.get("size")
        breed = self.request.query_params.get("breed")
        life_stage = self.request.query_params.get("life_stage")
        flavor = self.request.query_params.get("flavor")

        if brand:
            queryset = queryset.filter(brand__iexact=brand)
        if size:
            queryset = queryset.filter(size__iexact=size)
        if breed:
            queryset = queryset.filter(breed__iexact=breed)
        if life_stage:
            queryset = queryset.filter(life_stage__iexact=life_stage)
        if flavor:
            queryset = queryset.filter(flavor__iexact=flavor)

        # sorting
        sort = self.request.query_params.get("sort")
        if sort == "price_low_high":
            queryset = queryset.order_by("price")
        elif sort == "price_high_low":
            queryset = queryset.order_by("-price")
        elif sort == "new":
            queryset = queryset.order_by("-created_at")  # requires created_at field
        elif sort == "bestseller":
            queryset = queryset.order_by("-sales")  # requires sales field

        return queryset

# Product detail (using product ID)
class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    lookup_field = "id"   # ✅ use ID
    permission_classes = [AllowAny]
