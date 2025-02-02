from django.db import models


class FormationBioPlates(models.Model):
    STATUS_CHOICES = [
        ('pending', 'En attente'),
        ('published', 'Publié'),
    ]
    title = models.CharField(max_length=255, verbose_name="Titre")
    image = models.ImageField(upload_to='formations/',
                              verbose_name="Image", blank=True, null=True)

    description = models.TextField(blank=True, verbose_name="Description")
    pdf_document = models.FileField(
        upload_to='formations/pdfs/', blank=True, null=True, verbose_name="Document PDF")
    status = models.CharField(
        max_length=10,
        choices=STATUS_CHOICES,
        default='pending',
        verbose_name="Statut")
    formation_line = models.CharField(
        default="https://forms.zohopublic.com/carolinebergerdefemynie1/form/RecueildesbesoinsInscription/formperma/X8ryqIG4D2mdyqQI-FiBnW9a1vwiN-y0HuQGnPGetaQ")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Formation BioPlates"
        verbose_name_plural = "Formations BioPlates"

    def __str__(self):
        return self.title


class FormationLevel(models.Model):
    formation = models.ForeignKey(
        FormationBioPlates,
        on_delete=models.CASCADE,
        related_name='levels'
    )
    name = models.CharField(max_length=100, verbose_name="Nom du niveau")
    price = models.DecimalField(
        max_digits=10, decimal_places=2, verbose_name="Prix")

    class Meta:
        verbose_name = "Niveau de formation"
        verbose_name_plural = "Niveaux de formation"

    def __str__(self):
        return f"{self.formation.title} - {self.name} ({self.price}€)"
