import React, { useState, useContext, useRef, useEffect } from "react";
import Header from './Header.js';
import CalendarComponent from './CalendarComponent.js';
import CalendarModal from './CalendarModal.js';
import Button from '@material-ui/core/Button';
import MultipleDatesPicker from '@randex/material-ui-multiple-dates-picker';

import '../css/Home.css';

// tab imports
import PropTypes from 'prop-types';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
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

const tabTheme = createMuiTheme({
  palette: {
    primary: {
        main: '#FFF'
    },
  },
});
  
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

  // replace with context
  const [role, setRole] = useState("coach");

  let athleteSchedules;
    if (role === "athlete") {
    athleteSchedules = [
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
                  "name": "Test tag"
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
      },
      {
        "id": 18,
        "date": "2020-12-31 14:30",
        "notes": null,
        "workout": {
            "id": 18,
            "title": "Christmas Day workout :)",
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
        "location": "Remote",
        "athletes": [
            {
                "athlete": "Avner Volpert",
                "athlete_id": 3
            }
        ],
        "reports": []
      },
      {
        "id": 19,
        "date": "2020-8-20 14:30",
        "notes": null,
        "workout": {
            "id": 18,
            "title": "Birthday workout",
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
        "location": "Seattle",
        "athletes": [
            {
                "athlete": "Avner Volpert",
                "athlete_id": 3
            }
        ],
        "reports": []
      }
    ];
    }
    else {
      athleteSchedules = [{
        "id": 17,
        "date": "2020-11-13 22:06",
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
                "id": 1,
                "duration": "2.50",
                "effort": 8,
                "satisfaction": 10,
                "athlete": 1,
                "athlete_name": "Gilron Tsabkevich"
            }
        ],
        "average_effort": "8.00",
        "average_duration": "2.50",
        "average_satisfaction": "10.00"
      },
      {
        "id": 18,
        "date": "2021-8-20 22:06",
        "notes": null,
        "workout": {
            "id": 18,
            "title": "BDay Wokrout",
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
                "id": 1,
                "duration": "2.50",
                "effort": 8,
                "satisfaction": 10,
                "athlete": 1,
                "athlete_name": "Gilron Tsabkevich"
            }
        ],
        "average_effort": "8.00",
        "average_duration": "2.50",
        "average_satisfaction": "10.00"
      }]
    }
  
  const classes = useStyles();
  const [value, setValue] = useState(1);
  const [currentWeek, setWeek] = useState(0);
  const [currentMonth, setMonth] = useState(getMonth);

  function getMonth() {
    const currentDate = new Date();
    return currentDate.getMonth();
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
    setMonth(calendarMonths()[newValue]);
  };

  const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
  ]

  const calendarMonths = () => {
    const currentDate = new Date();
    const todayMonth = currentDate.getMonth();
    const todayYear = currentDate.getFullYear();
    let calendarMonths = [];

    for (let i = todayMonth - 1; i < months.length + todayMonth - 1; i++) {
      if (i >= 12) { calendarMonths.push(i - 12); }
      else calendarMonths.push(i);
    }
    return calendarMonths;
  }

  const weeks = [1, 2, 3, 4];

  function getRelevantWorkouts() {


    // filter by month
    const thisMonthWorkouts = athleteSchedules.filter(function (workout) {
      return parseInt(workout.date.split(" ")[0].split("-")[1]) === currentMonth + 1;
    });

    // return thisMonthWorkouts;
    if (currentWeek === 0) {
      return thisMonthWorkouts;
    }

    else {
    let thisWeekWorkouts = [];

    for (let i = 0; i < weeks.length; i++) {
      thisWeekWorkouts = thisMonthWorkouts.filter(function (workout) {
        return Math.floor((workout.date.split(" ")[0].split("-")[2])/7) === currentWeek - 1;
      });
    }
  
    return(thisWeekWorkouts);
    }
  }

  function useOutsideAlerter(ref) {
    useEffect(() => {
        // Alert if clicked on outside of element
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                setWeek(0);
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
  }

  // onclick listeners
  const wrapperRef = useRef(null);
  {useOutsideAlerter(wrapperRef)}

  function formatMonth(month, index) {
    const todayDate = new Date();
    let todayYear = todayDate.getFullYear();
    // console.log(value > 3);
    if (index > 2) todayYear++;
    return `${months[month]} ${todayYear}`;
  }


  return (
    <div className={classes.root}>
      <Header />
          <h1 >Calendars ({role} view)</h1>
      <AppBar
        position="static"
        id="month-bar"
        color="primary"
        style={{
          width: "100%",
        }}
      >
        <ThemeProvider theme={tabTheme}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
          >
            {calendarMonths().map((month, index) => (
                <Tab
                  label={formatMonth(month, index)}
                  {...a11yProps({index})}
                />
            ))}
          </Tabs>
        </ThemeProvider>
      </AppBar>
      {calendarMonths().map((month, index) => (
        <TabPanel value={value} index={index} style={{width: "105%", marginLeft:"-2.5%"}}>
          <div class="week-selector-container">
            <span class="week-button-label">
              Week:
            </span>
            <div ref={wrapperRef} style={{display: "inline"}}>
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
          </div>
          <div id="calendar-content" style={{width: "100%"}}>
            <CalendarComponent
              month={month + 1}
              week={currentWeek}
              weeklyScheduledWorkouts={getRelevantWorkouts()}
              role={role}
            ></CalendarComponent>
          </div>
        </TabPanel>
      ))}
      <CalendarModal></CalendarModal>
    </div>    
  );
}