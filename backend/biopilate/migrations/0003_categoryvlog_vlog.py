# Generated by Django 4.2 on 2024-12-10 11:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('biopilate', '0002_blogimage_delete_tarifs_blog_tages_cours_tages_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='CategoryVlog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
            options={
                'verbose_name_plural': 'category vlogs',
            },
        ),
        migrations.CreateModel(
            name='Vlog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255, verbose_name='Titre')),
                ('description', models.TextField()),
                ('image', models.ImageField(upload_to='vlogs_images/')),
                ('date', models.DateField(auto_now_add=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('status', models.CharField(choices=[('pending', 'En attente de publication'), ('approved', 'Publiée')], default='pending', max_length=10, verbose_name='Status')),
                ('category', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='category', to='biopilate.categoryvlog')),
            ],
            options={
                'verbose_name_plural': 'biopilates vlogs',
            },
        ),
    ]
