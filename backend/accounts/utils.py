import random
from django.conf import settings
from django.core.mail import EmailMessage
from .models import User ,OneTimePassword

def generateOtp():
    otp=""
    for i in range(6):
        otp+=str(random.randint(0,9))
    return otp

def send_code_to_user(email):
    Subject = "One time code for your account"
    otp_code = generateOtp()
    user = User.objects.get(email=email)
    current_site = "test.com"
    email_body = f"Hi {user.first_name} Your one time code is {otp_code}"
    from_email = settings.DEFAULT_FROM_EMAIL
    OneTimePassword.objects.create(user=user,code=otp_code)
    send_email = EmailMessage(
        subject=Subject,
        body=email_body,
        from_email=from_email,
        to=[email],
        bcc=[current_site],
        headers={"Reply-To": email},
        )
    send_email.send(fail_silently=True)


def send_normal_email(data):
    email = EmailMessage(
        subject=data["email_subject"],
        body=data["email_body"],
        from_email=settings.EMAIL_HOST_USER,
        to=[data["to_email"]],
    )
    email.send()