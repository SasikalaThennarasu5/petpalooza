from django.urls import path
from .views import CategoryListView, ProductByCategoryView, ProductDetailView

urlpatterns = [
    path("categories/", CategoryListView.as_view(), name="categories"),
    path("products/category/<int:id>/", ProductByCategoryView.as_view(), name="products-by-category"),
    path("products/<int:id>/", ProductDetailView.as_view(), name="product-detail"),
]
