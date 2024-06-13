from django.urls import path
from .views import (
    RegisterUserView, 
    VerifyUserEmailView,
    LoginUserView,
    SetNewPasswordView,
    PasswordResetView,
    VerifyPasswordResetView,
    LogoutUserView,
    Test,
    GetOneUserView,
    UpdateUserView,
    ListUsersView,
    DeleteUserView,
)
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'),
    path('verify/', VerifyUserEmailView.as_view(), name='verify'),
    path('login/', LoginUserView.as_view(), name='login'),
    path('password_reset/', PasswordResetView.as_view(), name='password_reset'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('password_reset_confirm/<uidb64>/<token>/', VerifyPasswordResetView.as_view(), name='password_reset_confirm'),
    path('set_new_password/', SetNewPasswordView.as_view(), name='set_new_password'),
    path('logout/', LogoutUserView.as_view(), name='logout'),
    path('test/', Test.as_view(), name='test'),
    path('get_one_user/', GetOneUserView.as_view(), name='get_one_user'),
    path('update_user/', UpdateUserView.as_view(), name='update_user'),
    path('users/all/', ListUsersView.as_view(), name='list_users'),
    path('delete_user/<int:id>/', DeleteUserView.as_view(), name='delete_user'),
]
