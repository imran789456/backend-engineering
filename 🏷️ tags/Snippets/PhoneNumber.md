## Best Practice to Add Phone Number in Django Model

* Post — https://stackoverflow.com/questions/19130942/whats-the-best-way-to-store-a-phone-number-in-django-models
* Install [django-phonenumber-field](https://pypi.org/project/django-phonenumber-field/) project from PyPi `pipenv install django-phonenumber-field[phonenumbers]`

```py
# settings.py
INSTALLED_APPS = [
    ...
    "phonenumber_field",
    ...
]

# models.py
from django.db import models
from phonenumber_field.modelfields import PhoneNumberField

class Contact(models.Model):
    phone = PhoneNumberField(unique=True)

# admin.py
from django.contrib import admin
from .models import Contact
from phonenumber_field.widgets import PhoneNumberPrefixWidget

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    form = ContactForm

# app/forms.py
from django import forms

class ContactForm(forms.ModelForm):
    class Meta:
        widgets = {
            'phone': PhoneNumberPrefixWidget(initial='BD'),
        }

>>> Python manage.py makemigrations
>>> python manage.py migrate
```

