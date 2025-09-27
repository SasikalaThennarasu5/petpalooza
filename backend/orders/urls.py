from django.urls import path
from .views import (
    CartView,
    AddToCartView,
    RemoveFromCartView,
    CheckoutView,
    OrderListView,
    OrderDetailView,
)

urlpatterns = [
    # cart
    path("cart/", CartView.as_view(), name="cart"),
    path("cart/add/", AddToCartView.as_view(), name="add-to-cart"),
    path("cart/remove/", RemoveFromCartView.as_view(), name="remove-from-cart"),

    # orders
    path("checkout/", CheckoutView.as_view(), name="checkout"),
    path("orders/", OrderListView.as_view(), name="order-list"),
    path("orders/<int:pk>/", OrderDetailView.as_view(), name="order-detail"),
]
