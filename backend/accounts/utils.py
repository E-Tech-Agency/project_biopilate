import random
from django.conf import settings
from django.core.mail import EmailMessage
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.exceptions import ValidationError
from .models import User, OneTimePassword
from django.core.mail import send_mail
def generateOtp():
    otp = ''.join(str(random.randint(0, 9)) for _ in range(6))  # Generate a 6-digit OTP
    return otp

def send_code_to_user(email):
    subject = "Code de vérification pour votre compte"
    otp_code = generateOtp()
    
    try:
        user = User.objects.get(email=email)
    except ObjectDoesNotExist:
        raise ValidationError("Aucun utilisateur avec cet e-mail n'existe.")

    # Update current_site to use get_current_site if in a request context
    current_site = "test.com"  # Adjust this if you have access to the request context
   
    email_body = (
        f"Bonjour {user.first_name},\n\n"
        f"Votre code de vérification unique est : {otp_code}\n\n"
        "Veuillez ne pas partager ce code avec d'autres personnes.\n"
        "Meilleures salutations,\n"
        "L'équipe Studio Biopilates Paris\n\n"
      
    )
    
    from_email = settings.DEFAULT_FROM_EMAIL
    OneTimePassword.objects.create(user=user, code=otp_code)  # Store OTP in the database
    
    send_email = EmailMessage(
        subject=subject,
        body=email_body,
        from_email=from_email,
        to=[email],
        bcc=[current_site],
        headers={"Reply-To": email},
    )
    
    try:
        send_email.send(fail_silently=False)  # Set to False to raise exceptions if email fails to send
    except Exception as e:
        # Handle the error as needed
        print(f"Erreur lors de l'envoi de l'email : {e}")

def send_normal_email(data):
    email = EmailMessage(
        subject=data["email_subject"],
        body=data["email_body"],
        from_email=settings.EMAIL_HOST_USER,
        to=[data["to_email"]],
    )
    
    try:
        email.send(fail_silently=False)  # Raise exceptions if email fails to send
    except Exception as e:
        # Handle the error as needed
        print(f"Erreur lors de l'envoi de l'email normal : {e}")


def send_contact_form_email(name, email, phone, subject, message):
   
    email_subject = f"Contact Form Submission: {subject}"
    email_message = (
        f"Name: {name}\n"
        f"Email: {email}\n"
        f"Phone: {phone}\n\n"
        f"Message:\n{message}"
    )

    try:
        send_mail(
            email_subject,
            email_message,
            'administration@biopilates.fr',  # From email (OVH email)
            ['administration@biopilates.fr'],  # To email (where you receive contact form submissions)
            fail_silently=False,
        )
    except Exception as e:
        print(f"Error while sending email: {e}")
        raise e

