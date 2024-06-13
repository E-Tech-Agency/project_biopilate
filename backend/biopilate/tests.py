# from django.test import TestCase

# # tests.py
# from rest_framework import status
# from rest_framework.test import APITestCase
# from .models.formation import Option, Formations, SelectedOption

# class OptionTests(APITestCase):
#     def test_create_option(self):
#         url = '/api/options/'  # Correct URL
#         data = {'name': 'Option 1'}
#         response = self.client.post(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(Option.objects.count(), 1)
#         self.assertEqual(Option.objects.get().name, 'Option 1')

# class FormationTests(APITestCase):
#     def test_create_formation(self):
#         url = '/api/formations/'  # Correct URL
#         data = {
#             'title': 'Formation 1',
#             'description': 'Description of formation 1'
#         }
#         response = self.client.post(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(Formations.objects.count(), 1)
#         self.assertEqual(Formations.objects.get().title, 'Formation 1')

# class SelectedOptionTests(APITestCase):
#     def test_create_selected_option(self):
#         option = Option.objects.create(name='Option 1')
#         formation = Formations.objects.create(title='Formation 1', description='Description of formation 1')
#         url = '/api/selected-options/'  # Correct URL
#         data = {
#             'option': option.id,
#             'formation': formation.id,
#             'price': '100.00'
#         }
#         response = self.client.post(url, data, format='json')
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertEqual(SelectedOption.objects.count(), 1)
#         self.assertEqual(SelectedOption.objects.get().price, 100.00)