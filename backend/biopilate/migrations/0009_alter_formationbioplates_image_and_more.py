# Generated by Django 4.2 on 2025-01-31 14:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('biopilate', '0008_alter_formationbioplates_image_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='formationbioplates',
            name='image',
            field=models.ImageField(blank=True, null=True, upload_to='formations/', verbose_name='Image'),
        ),
        migrations.AlterField(
            model_name='formationbioplates',
            name='pdf_document',
            field=models.FileField(blank=True, null=True, upload_to='formations/pdfs/', verbose_name='Document PDF'),
        ),
    ]
