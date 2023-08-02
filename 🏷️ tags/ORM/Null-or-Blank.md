## Difference between `null=True` and `blank=True` in Django?

* https://stackoverflow.com/questions/8609192/what-is-the-difference-between-null-true-and-blank-true-in-django

It's crucial to understand that the options in a Django model field definition serve (at least) two purposes: defining the database tables, and defining the default format and validation of model forms. (I say "default" because the values can always be overridden by providing a custom form.) Some options affect the database, some options affect forms, and some affect both.

When it comes to `null` and `blank`, other answers have already made clear that the former affects the database table definition and the latter affects model validation. I think the distinction can be made even clearer by looking at use cases for all four possible configurations:

* `null=False`, `blank=False`: This is the default configuration and means that the value is required in all circumstances.
* `null=True`, `blank=True`: This means that the field is optional in all circumstances. As noted below, though, this is *not* the recommended way to make string-based fields optional.
* `null=False`, `blank=True`: This means that the form doesn't require a value but the database does. There are a number of use cases for this:
    * The most common use is for optional string-based fields. As [noted in the documentation](https://docs.djangoproject.com/en/dev/ref/models/fields/#null), the Django idiom is to use the empty string to indicate a missing value. If `NULL` was also allowed you would end up with two different ways to indicate a missing value. (If the field is also `unique`, though, you'll have to use `null=True` to prevent multiple empty strings from failing the uniqueness check.)
    * Another common situation is that you want to calculate one field automatically based on the value of another (in your `save()` method, say). You don't want the user to provide the value in a form (hence `blank=True`), but you do want the database to enforce that a value is always provided (`null=False`).
    * Another use is when you want to indicate that a `ManyToManyField` is optional. Because this field is implemented as a separate table rather than a database column, `null` is [meaningless](https://stackoverflow.com/questions/18243039/migrating-manytomanyfield-to-null-true-blank-true-isnt-recognized/18244527#18244527). The value of `blank` will still affect forms, though, controlling whether or not validation will succeed when there are no relations.
* `null=True`, `blank=False`: This means that the form requires a value but the database doesn't. This may be the most infrequently used configuration, but there are some use cases for it:
    * It's perfectly reasonable to require your users to always include a value even if it's not actually required by your business logic. After all, forms are only one way of adding and editing data. You may have code that is generating data that doesn't need the same stringent validation you want to require of a human editor.
    * Another use case that I've seen is when you have a `ForeignKey` for which you don't wish to allow [cascade deletion](https://docs.djangoproject.com/en/dev/ref/models/fields/#django.db.models.ForeignKey.on_delete). That is, in normal use the relation should always be there (`blank=False`), but if the thing it points to happens to be deleted, you don't want this object to be deleted too. In that case, you can use `null=True` and `on_delete=models.SET_NULL` to implement a simple kind of [soft deletion](https://stackoverflow.com/questions/378331/physical-vs-logical-soft-delete-of-database-record).

## When to Use Null and Blank by Field `two scopes of Django 3.x`

![null-balnk](https://files.catbox.moe/imrisd.png)

## Django Tips #8 Blank or Null

* https://simpleisbetterthancomplex.com/tips/2016/07/25/django-tip-8-blank-or-null.html

Django models API offers two similar options that usually cause confusion on many developers: `null` and `blank`. When I first started working with Django I couldn’t tell the difference and always ended up using both. Sometimes even using them improperly.

Both do almost the same thing, as the name suggests, but here is the difference:

**Null**: It is database-related. Defines if a given database column will accept null values or not.  
**Blank**: It is validation-related. It will be used during forms validation when calling `form.is_valid()`.

That being said, it is perfectly fine to have a field with `null=True` and `blank=False`. Meaning on the database level the field can be NULL, but on the application level, it is a required field.

Now, where most developers get it wrong: Defining `null=True` for string-based fields such as `CharField` and `TextField`. Avoid doing that. Otherwise, you will end up having two possible values for “no data”, that is: **None** and an **empty string**. Having two possible values for “no data” is redundant. The Django convention is to use the **empty string**, not **NULL**.

So, if you want a string-based model field to be “nullable”, prefer doing that:

```py
class Person(models.Model):
    name = models.CharField(max_length=255)  # Mandatory
    bio = models.TextField(max_length=500, blank=True)  # Optional (don't put null=True)
    birth_date = models.DateField(null=True, blank=True) # Optional (here you may add null=True)
```

The default values of `null` and `blank` are **False**.

Also, there is a special case, when you need to accept **NULL** values for a `BooleanField`, use `BooleanField(null=True)` instead.
