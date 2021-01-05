# Ludis

Ludis is a sports communication app developed by [Gilron Tsabkevich](https://github.com/gilron07) and [Henry Herrington](https://github.com/henryherrington) for their Fall 2020 Independent Work Projects.<br>

Visit https://goludis.herokuapp.com/ to view the deployed app.
![Ludis Logo](https://github.com/henryherrington/ludis_images/blob/master/ludis_logo.png | width=100)
![Ludis Calendar](https://github.com/henryherrington/ludis_images/blob/master/ludis_calendar.png | width=100)
![Ludis Workout Creation](https://github.com/henryherrington/ludis_images/blob/master/ludis_workout_creation.png | width=100)

### Run Locally

To run the project locally, first install all the NodeJS and Python dependencies:

```
npm install
pip install -r requirements.txt
```

To build the React app, execute:

```
npm run build
```

To run the app, the environment variable `DATABASE_URL` must be exported in order for the server to run. Once this environment variable is exported, start the server using:

```
python manage.py runserver
```

The webapp will then launch at http://localhost:8000/.

<hr>
