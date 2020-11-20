release: python manage.py migrate
web: npm run build --log-file -
web: gunicorn ludis.wsgi --logfile -
