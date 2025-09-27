from django.db import models

class Page(models.Model):
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True)  # e.g., "about", "contact"
    content = models.TextField()
    image = models.ImageField(upload_to="pages/", blank=True, null=True)

    def __str__(self):
        return self.title
    
class FooterLink(models.Model):
    SECTION_CHOICES = [
        ("about", "About Us"),
        ("categories", "Categories"),
        ("support", "Support"),
        ("social", "Social"),
    ]
    section = models.CharField(max_length=20, choices=SECTION_CHOICES)
    label = models.CharField(max_length=100)
    url = models.URLField()

    def __str__(self):
        return f"{self.section} - {self.label}"


class NewsletterText(models.Model):
    title = models.CharField(max_length=100, default="Subscribe")
    description = models.TextField(blank=True)

class Footer(models.Model):
    about_title = models.CharField(max_length=100, default="PetPalooza")
    about_links = models.JSONField(default=list, blank=True, null=True)

    categories_title = models.CharField(max_length=100, default="Categories")
    categories = models.JSONField(default=list, blank=True, null=True)

    support_title = models.CharField(max_length=100, default="Support")
    support_links = models.JSONField(default=list, blank=True, null=True)

    facebook_url = models.URLField(blank=True, null=True)
    instagram_url = models.URLField(blank=True, null=True)
    youtube_url = models.URLField(blank=True, null=True)
    whatsapp_url = models.URLField(blank=True, null=True)

    contact_phone = models.CharField(max_length=50, blank=True, null=True)
    contact_email = models.EmailField(blank=True, null=True)

    subscribe_text = models.CharField(max_length=100, default="For Subscribe")

    def __str__(self):
        return "Footer Settings"
    
class HeroBanner(models.Model):
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=400, blank=True)
    image = models.ImageField(upload_to="banners/")
    button_text = models.CharField(max_length=50, blank=True)
    button_link = models.CharField(max_length=255, blank=True)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title

class PromoBanner(models.Model):
    title = models.CharField(max_length=200)
    subtitle = models.CharField(max_length=400, blank=True)
    image = models.ImageField(upload_to="promos/")
    button_text = models.CharField(max_length=50, blank=True)
    button_link = models.CharField(max_length=255, blank=True)
    is_active = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return self.title

class Service(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="services/", blank=True, null=True)
    link = models.CharField(max_length=255, blank=True)

    def __str__(self):
        return self.title
    


class AboutPage(models.Model):
    title = models.CharField(max_length=200)
    mission = models.TextField()
    mission_image = models.ImageField(upload_to="about/hero/", blank=True, null=True)

    description_title = models.CharField(max_length=200, default="ANYTHING FOR PETS®")
    description = models.TextField()

    # 3 cards
    card1_title = models.CharField(max_length=100, default="Our story")
    card1_image = models.ImageField(upload_to="about/cards/", blank=True, null=True)
    card1_link = models.CharField(max_length=200, blank=True, null=True)

    card2_title = models.CharField(max_length=100, default="Media resources")
    card2_image = models.ImageField(upload_to="about/cards/", blank=True, null=True)
    card2_link = models.CharField(max_length=200, blank=True, null=True)

    card3_title = models.CharField(max_length=100, default="Charities")
    card3_image = models.ImageField(upload_to="about/cards/", blank=True, null=True)
    card3_link = models.CharField(max_length=200, blank=True, null=True)

    bottom_title = models.CharField(max_length=200, blank=True, null=True)
    bottom_text = models.TextField(blank=True, null=True)
    bottom_image = models.ImageField(upload_to="about/bottom/", blank=True, null=True)

    def __str__(self):
        return self.title or "About Page"
