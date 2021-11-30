from django.apps import AppConfig


class PinterestAppConfig(AppConfig):
    name = 'pinterest_app'

    def ready(self):
        from . import signals