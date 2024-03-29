<p align="center"><img alt="Ludis Logo" src="https://github.com/gilron07/Ludis-IW/blob/master/images/ludis_logo.png" width="20%" align="center"></p>

Ludis is a sports communication app developed by [Gilron Tsabkevich](https://github.com/gilron07) and [Henry Herrington](https://github.com/henryherrington) for their Fall 2020 Independent Work Projects.<br>

Visit https://goludis.herokuapp.com/ to view the deployed app.<br><br>
<img alt="Ludis Calendar" src="https://github.com/gilron07/Ludis-IW/blob/master/images/ludis_calendar.png" width="48%">
<img alt="Ludis Workout Creation" src="https://github.com/gilron07/Ludis-IW/blob/master/images/ludis_workout_creation.png" width="48%"><br>

### Run Locally

To run the project locally, first install all the NodeJS and Python dependencies using:

```
npm install
pip install -r requirements.txt
```

To build the React app, execute:

```
npm run build
```

To run the app, the environment variable `DATABASE_URL` must be exported, and then the server can be started using:

```
python manage.py runserver
```

The app will then launch at http://localhost:8000/.

<hr>
