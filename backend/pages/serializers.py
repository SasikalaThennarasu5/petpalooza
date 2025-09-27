from rest_framework import serializers
from .models import Page, Footer, NewsletterText, HeroBanner, PromoBanner, Service, AboutPage
from products.models import Category, Product


class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = "__all__"


class FooterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Footer
        fields = "__all__"


class NewsletterTextSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsletterText
        fields = "__all__"


class HeroBannerSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = HeroBanner
        fields = ("id", "title", "subtitle", "image", "button_text", "button_link", "order")

    def get_image(self, obj):
        request = self.context.get("request")
        return request.build_absolute_uri(obj.image.url) if obj.image else None


class PromoBannerSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = PromoBanner
        fields = ("id", "title", "subtitle", "image", "button_text", "button_link", "order")

    def get_image(self, obj):
        request = self.context.get("request")
        return request.build_absolute_uri(obj.image.url) if obj.image else None


class ServiceSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = ("id", "title", "description", "image", "link")

    def get_image(self, obj):
        request = self.context.get("request")
        return request.build_absolute_uri(obj.image.url) if obj.image else None


# Simple category and product serializers for home
class CategoryMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ("id", "name", "slug")


class ProductMiniSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()
    rating = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ("id", "name", "slug", "image", "price", "rating")

    def get_image(self, obj):
        request = self.context.get("request")
        return request.build_absolute_uri(obj.image.url) if obj.image else None

    def get_rating(self, obj):
        # placeholder rating; replace with real avg rating if you add a reviews model
        return getattr(obj, "rating", 4.5)

class AboutPageSerializer(serializers.ModelSerializer):
    mission_image = serializers.SerializerMethodField()
    card1_image = serializers.SerializerMethodField()
    card2_image = serializers.SerializerMethodField()
    card3_image = serializers.SerializerMethodField()
    bottom_image = serializers.SerializerMethodField()

    class Meta:
        model = AboutPage
        fields = "__all__"

    def get_mission_image(self, obj):
        request = self.context.get("request")
        return request.build_absolute_uri(obj.mission_image.url) if obj.mission_image else None

    def get_card1_image(self, obj):
        request = self.context.get("request")
        return request.build_absolute_uri(obj.card1_image.url) if obj.card1_image else None

    def get_card2_image(self, obj):
        request = self.context.get("request")
        return request.build_absolute_uri(obj.card2_image.url) if obj.card2_image else None

    def get_card3_image(self, obj):
        request = self.context.get("request")
        return request.build_absolute_uri(obj.card3_image.url) if obj.card3_image else None

    def get_bottom_image(self, obj):
        request = self.context.get("request")
        return request.build_absolute_uri(obj.bottom_image.url) if obj.bottom_image else None