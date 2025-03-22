import subprocess as sp
import os
import sys

from django.conf import settings
from django.core.management.base import BaseCommand, CommandError

class Command(BaseCommand):
    help = "Builds the React.js frontend"

    def add_arguments(self, parser):
        pass

    def handle(self, *args, **options):
        os.chdir(settings.BASE_DIR / "frontend")
        args = "npm run build".split(" ")
        sp.run(args)
        sys.exit(0)

