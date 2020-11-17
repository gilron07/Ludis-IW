import React, { useState } from 'react';
import Header from './Header.js';
import CalendarComponent from './CalendarComponent.js';
import CalendarModal from './CalendarModal.js';
import Button from '@material-ui/core/Button';
import MultipleDatesPicker from '@randex/material-ui-multiple-dates-picker';

import '../css/Home.css';

// tab imports
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';


TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};
  
function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));
  
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

export default function Home() {
  
  const classes = useStyles();
  const [value, setValue] = useState(0);
  const [currentWeek, setWeek] = useState(1);
  const [currentMonth, setMonth] = useState("January");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const tabLabels = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
  ]

  const weeks = [1, 2, 3, 4];

  return (
    <div className={classes.root}>
      <Header />
          <h1 >Calendar</h1>
      <AppBar position="static" color="primary" id="month-bar">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="default"
          textColor="default"
          variant="scrollable"
          scrollButtons="auto"
          aria-label="scrollable auto tabs example"
        >
          {tabLabels.map((month, index) => (
              <Tab label={month} {...a11yProps({index})} onClick={() => setMonth(month)}/>
          ))}
        </Tabs>
      </AppBar>
      {tabLabels.map((month, index) => (
        <TabPanel value={value} index={index}>
          <div class="week-selector-container">
              <span class="week-button-label">
              Week:
              </span>
              { weeks.map((week, index) => {
                const id = "wb".concat({week});
                let classes = "week-button"

                if (currentWeek === week) {
                  classes = classes.concat(" week-button-select");
                }

                return (<div id={id} class={classes} onClick={() => setWeek(week)}>
                  <div class="week-button-text">{week}</div>
                </div>)
              })}

          </div>
          <div id="calendar-content">
            <CalendarComponent month={month} week={currentWeek} weeklyWorkouts={athleteSchedules}></CalendarComponent>
          </div>
        </TabPanel>
      ))}
      <CalendarModal></CalendarModal>
    </div>    
  );
}



const athleteSchedules = [
  {
  "id": 16,
  "date": "2020-11-13 09:00",
  "notes": null,
  "workout": {
      "id": 18,
      "title": "Sprints Tuesday Wokrout",
      "owner": "Gilron Tsabkevich",
      "tags": [
          {
              "name": "sprints"
          },
          {
              "name": "technical"
          }
      ]
  },
  "owner": "Gilron Tsabkevich",
  "location": "Jadwin",
  "athletes": [
      {
          "athlete": "Avner Volpert",
          "athlete_id": 3
      }
  ],
  "reports": [
      {
          "id": 2,
          "duration": "1.50",
          "effort": 2,
          "satisfaction": 3,
          "athlete": 3,
          "athlete_name": "Avner Volpert"
      }
  ]
  },
  {
      "id": 17,
      "date": "2020-11-16 14:30",
      "notes": null,
      "workout": {
          "id": 18,
          "title": "Afternoon Workout!",
          "owner": "Gilron Tsabkevich",
          "tags": [
              {
                  "name": "sprints"
              },
              {
                  "name": "technical"
              }
          ]
      },
      "owner": "Coach Tsabkevich",
      "location": "Poe Field",
      "athletes": [
          {
              "athlete": "Avner Volpert",
              "athlete_id": 3
          }
      ],
      "reports": []
      }
];