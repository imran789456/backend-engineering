## JSON Web Token Authentication

* Documentation — https://django-rest-framework-simplejwt.readthedocs.io/en/latest/
* Install the Package `pipenv install djangorestframework-simplejwt`

```py
# settings.py
from datetime import timedelta

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=5),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
}

INSTALLED_APPS = [
    'rest_framework',
    'rest_framework_simplejwt',
    ...
]

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    )
}

# urls.py
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

urlpattens = [
    ...
    path("getToken/", TokenObtainPairView.as_view(), name="get_token"),
    path("refreshToken/", TokenRefreshView.as_view(), name="refresh_token"),
    path("verifyToken/", TokenVerifyView.as_view(), name="verify_token"),
]
```

```py
# get the token
http http://127.0.0.1:8000/getToken/ username=<username> password=<password>

# GET request
http GET http://127.0.0.1:8000/api/<ApiName>/ "Authorization: Bearer <token>"

# POST request
http POST http://127.0.0.1:8000/api/<ApiName>/ field=value "Authorization: Bearer <token>"

# DELETE request
http DELETE http://127.0.0.1:8000/api/<ApiName>/<id>/ "Authorization: Bearer <token>"

# PUT request
http PUT http://127.0.0.1:8000/api/<ApiName>/<id>/ field=value "Authorization: Bearer <token>"

# refresh token
http http://127.0.0.1:8000/refreshToken/ refresh="<refresh_token>"

# verify token
http http://127.0.0.1:8000/verifyToken/ token="<token>"
```

* The token is divided into 3 parts
    * eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9. — header
    * eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTY5MjYwMjI2MywiaWF0IjoxNjkyNTE1ODYzLCJqdGkiOiI5M2Y3MWY5YjJlZWQ0M2Y3OTdkZDhkMWUwYzYyNzY3YyIsInVzZXJfaWQiOjF9. — payload
    * HAFWMb4GKoICkTdjF4D2WoCyAGP8h6kqFOzqjDbhnUo — signature