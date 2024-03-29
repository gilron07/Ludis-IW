import React, { useState, useContext, useRef, useEffect } from "react";
import Header from './Header.js';
import CalendarComponent from './CalendarComponent.js';
import CalendarModal from './CalendarModal.js';
import axiosAPI from '../services/authAxios';

import '../css/Home.css';

// tab imports
import PropTypes from 'prop-types';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import {UserContext} from "../services/UserContext";

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
          {children}
        </Box>
      )}
    </div>
  );
}

export default function Home() {

  // replace with context
  const [schdeuleData, setScheduleData] = useState([]);
  const [workoutsData, setWorkoutsData] = useState([]);
  const [athleteListData, setAthleteListData] = useState([]);

  const {user,setLoading} = useContext(UserContext);
  // const user = {"role":"coach"};

  useEffect(() => {
      const fetchScheduleData = async () => {
          const result = await axiosAPI.get('/schedule/');
          setScheduleData(result.data);
          setLoading(false);
      };
      setLoading(true);
      fetchScheduleData();
  }, []);

  useEffect(() =>{
        const fetchWorkoutsData = async () =>{
          const result = await axiosAPI.get('/workouts/');
          setWorkoutsData(result.data)
        };
        fetchWorkoutsData();
  }, []);
  
  const classes = useStyles();
  const [value, setValue] = useState(2);
  const [currentWeek, setWeek] = useState(0);
  const [currentMonth, setMonth] = useState(getMonth);
  const [currentYear, setYear] = useState(getYear);

  function getMonth() {
    const currentDate = new Date();
    return currentDate.getMonth();
  }

  function getYear() {
    let currentDate = new Date();
    return currentDate.getFullYear();
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
    setMonth(calendarMonths()[newValue]);
    if (newValue < calendarMonths()[newValue]) {
      setYear(getYear() - 1);
    }
    else setYear(getYear());
  };

  const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
  ]

  const calendarMonths = () => {
    const currentDate = new Date();
    const todayMonth = currentDate.getMonth();
    let calendarMonths = [];

    for (let i = todayMonth - 2; i < months.length + todayMonth - 2; i++) {
      if (i >= months.length) { calendarMonths.push(i - months.length); }
      else if (i < 0) { calendarMonths.push(months.length + i); }
      else calendarMonths.push(i);
    }
    return calendarMonths;
  }

  const weeks = [1, 2, 3, 4];

  function getRelevantWorkouts() {

    // filter by year
    const thisYearWorkouts = schdeuleData.filter(function (workout) {
      return parseInt(workout.date.split(" ")[0].split("-")[0]) === currentYear;
    });

    // filter by month
    const thisMonthWorkouts = thisYearWorkouts.filter(function (workout) {
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
        const dayDate = parseInt(workout.date.split(" ")[0].split("-")[2]);
        if (dayDate < 8 && currentWeek === 1) return true;
        if (dayDate >= 8 && dayDate < 15 && currentWeek === 2) return true;
        if (dayDate >= 15 && dayDate < 22 && currentWeek === 3) return true;
        if (dayDate >= 22 && currentWeek === 4) return true;
        return false;
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

    if (index < month) {
      todayYear--;
    }
    
    return `${months[month]} ${todayYear}`;
  }


  return (
    <div className={classes.root}>
      <Header />
          <h1 >Calendar</h1>
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
          <div className="week-selector-container">
            <span className="week-button-label">
              Week:
            </span>
            <div ref={wrapperRef} style={{display: "inline"}}>
              { weeks.map((week, index) => {
                const id = "wb".concat({week});
                let classes = "week-button"

                if (currentWeek === week) {
                  classes = classes.concat("week-button-select");
                }

                return (<div id={id} className={classes} onClick={() => setWeek(week)}>
                  <div className="week-button-text">{week}</div>
                </div>)
              })}
            </div>
          </div>
          <div id="calendar-content" style={{width: "100%"}}>
            <CalendarComponent
              month={month + 1}
              week={currentWeek}
              weeklyScheduledWorkouts={getRelevantWorkouts()}
              role={user.role}
            ></CalendarComponent>
          </div>
        </TabPanel>
      ))}

      {user.role.toLowerCase() === "coach"
        ?
        <CalendarModal
          workoutsList={workoutsData}
          athletesList={athleteListData}
          updateSchdeule={setScheduleData}
        ></CalendarModal>
        : null
      }
    </div>    
  );
}