## Static Files

Static files: These are your CSS stylesheets, JavaScript files, fonts, and images. Since there's no processing involved, these files are very energy efficient since they can just be served up as is. They are also much easier to cache.

Django's staticfiles app provides the following core components:

* Settings
* Management commands
* Storage classes
* Template tags

### Settings 

* **STATIC_URL**: URL where the user can access your static files from in the browser. The default is `/static/`, which means your files will be available at `http://127.0.0.1:8000/static/` in development mode.
* **STATIC_ROOT**: The absolute path to the directory where your Django application will serve your static files from. When you run the `python manage,py collectstatic` management command, it will find all static files and copy them into this directory.
* **STATICFILES_DIRS**: By default, static files are stored at the app-level at `appName/static/`. The `collectstatic` command will look for static files in those directories. You can also tell Django to look for static files in additional locations with `STATICFILES_DIRS = []`
* **STATICFILES_STORAGE**: The file storage class you'd like to use, which controls how the static files are stored and accessed. The files are stored in the file system via [StaticFilesStorage](https://docs.djangoproject.com/en/4.0/ref/contrib/staticfiles/#staticfilesstorage).
* **STATICFILES_FINDERS**: This setting defines the file finder backends to be used to automatically find static files. By default, the `FileSystemFinder` and `AppDirectoriesFinder` finders are used.
    * FileSystemFinder - uses the `STATICFILES_DIRS` setting to find files.
    * AppDirectoriesFinder - looks for files in a `static` folder in each Django app within the project.

### Management Commands

* `collectstatic` is a management command that collects static files from the various locations, `app/static/` and the directories found in the `STATICFILES_DIRS` setting -- and copies them to the `STATIC_ROOT` directory.
* `findstatic` is a really helpful command to use when debugging so you can see exactly where a specific file comes from.

### Static Files in Development Mode

However, since most Django projects involve multiple apps and shared static files, it is common on larger projects to instead create a base-level folder typically named static.

```python
# settings.py
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_DIRS = [BASE_DIR / 'static',] # base-level
STATICFILES_STORAGE = 'django.contrib.staticfiles.storage.StaticFilesStorage'
```

### Static Files in Production

The two most popular options are:

* Use a web server like Nginx to route traffic destined for your static files directly to the STATIC_ROOT.
* Use [WhiteNoise](https://whitenoise.evans.io/en/stable/) to serve up static files directly from the WSGI or ASGI web application server.

```python
# settings.py
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # WhiteNoise!
    # ....
]

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_DIRS = [BASE_DIR / 'static',] 
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
```

Ngnix Configuration

```ngnix
upstream hello_django {
    server web:8000;
}

server {
    listen 80;

    location / {
        proxy_pass http://hello_django;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        proxy_redirect off;
    }

    location /static/ {
        alias /home/app/web/staticfiles/;
    }
}
```

That's it! Turn off debug [settings.DEBUG=False] mode, run the `python manage.py collectstatic` command, and then run your WSGI or ASGI web application server.

## Media Files

Media file: These are files that a user uploads.

The files associated with the `FileField` or `ImageField` model fields should be treated as media files.

### Settings

* **MEDIA_URL**: Similar to the `STATIC_URL`, this is the URL where users can access media files.
* **MEDIA_ROOT**: The absolute path to the directory where your Django application will serve your media files from.
* **DEFAULT_FILE_STORAGE**: The file storage class you'd like to use, which controls how the media files are stored and accessed. The default is `FileSystemStorage`.

### Media Files in Development Mode

```python
# settings.py
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'uploads'

# urls.py
from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    # ... 

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
```

### Media Files in Production

WhiteNoise is not suitable for serving user-uploaded “media” files.

Ngnix configuration

```ngnix
upstream hello_django {
    server web:8000;
}

server {
    listen 80;

    location / {
        proxy_pass http://hello_django;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $host;
        proxy_redirect off;
    }

    location /media/ {
        alias /home/app/web/mediafiles/;
    }
}
```