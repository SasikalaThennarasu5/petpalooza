from django.contrib import admin
from .models import Page
from .models import Footer, HeroBanner, PromoBanner, Service, AboutPage


@admin.register(Page)
class PageAdmin(admin.ModelAdmin):
    list_display = ("title", "slug")
    prepopulated_fields = {"slug": ("title",)}

@admin.register(Footer)
class FooterAdmin(admin.ModelAdmin):
    list_display = ("about_title", "contact_email", "contact_phone")

@admin.register(HeroBanner)
class HeroBannerAdmin(admin.ModelAdmin):
    list_display = ("title", "is_active", "order")
    list_editable = ("is_active", "order")

@admin.register(PromoBanner)
class PromoBannerAdmin(admin.ModelAdmin):
    list_display = ("title", "is_active", "order")
    list_editable = ("is_active", "order")

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("title", "link")

@admin.register(AboutPage)
class AboutPageAdmin(admin.ModelAdmin):
    fieldsets = (
        ("Mission Section", {
            "fields": ("title", "mission", "mission_image")
        }),
        ("Description", {
            "fields": ("description_title", "description")
        }),
        ("Cards", {
            "fields": (
                ("card1_title", "card1_image", "card1_link"),
                ("card2_title", "card2_image", "card2_link"),
                ("card3_title", "card3_image", "card3_link"),
            )
        }),
        ("Bottom Section", {
            "fields": ("bottom_title", "bottom_text", "bottom_image")
        }),
    )