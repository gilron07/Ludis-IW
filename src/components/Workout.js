import React, { useContext, useState, useEffect } from 'react';
import Header from './Header.js';
import ReportModal from './ReportModal.js';
import {UserContext} from "../services/UserContext";
import AllReportsModal from './AllReportsModal';

import axiosAPI from '../services/authAxios'

// Material UI components
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';

// Timeline imports
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';

// css
import '../css/Workout.css';

// icons
import ScheduleIcon from '@material-ui/icons/Schedule';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const useStyles = makeStyles((theme) => ({
    logisticsIcon: {
        fontSize: 40,
        margin: "auto",
        display: "block",
        marginBottom: 10
    },
    timeline: {
        // backgroundColor: "red",
        marginLeft: "-30px"
    },
    oppositeContent: {
        backgroundColor: "yellow",
        display: "none",
        flex: 0,
    },
    logisticsContainer: {
      // backgroundColor: "red",
      display:"flex",
      justifyContent:"center",
      maxWidth: 400,
      margin: "auto",
    },
    logistic: {
      border: "1px solid grey",
      borderRadius: 10,
      width: "28%",
      margin: "0 4%",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
    },
    logisticLabel: {

    },
    tagsContainer: {
        textAlign: "center",
        width: "100%",
        margin: "30px 0",
    }
}));


export default function Workout(props) {
    const scheduledWorkout = props.location.scheduledWorkout;
    const baseWorkoutId = props.location.baseWorkoutId;
    const classes = useStyles();
    const {user} = useContext(UserContext);

    const [importedWorkout, setImportedWorkout] = useState(scheduledWorkout);
    const [axiosData, setAxiosData] = useState("");

    useEffect(() =>{
        const fetchData = async () =>{
          const result = await axiosAPI.get(`/workouts/${baseWorkoutId}/`);
          setAxiosData(result.data)
        };
        fetchData();
    }, []);


    function loadCompletedReport() {
      let duration, effort, satisfaction, average, allReports;
      
      // athlete view else coach view
      if (user.role.toLowerCase() === "athlete") {
        duration = importedWorkout["reports"][0]["duration"];
        effort = importedWorkout["reports"][0]["effort"];
        satisfaction = importedWorkout["reports"][0]["satisfaction"];
        average=null;
        allReports=null;
      }
      else {
        duration = importedWorkout["average_duration"];
        effort = importedWorkout["average_effort"];
        satisfaction = importedWorkout["average_satisfaction"];
        average="Averages";
        allReports=<AllReportsModal reports={importedWorkout.reports}></AllReportsModal>
      } 
      
      return(
        <div style={{textAlign:"center"}}>{average}
          <div className={classes.logisticsContainer}>
            <div className={classes.logistic}>
              <div className={classes.logisticLabel}>Duration</div>
              <div style={{fontSize:20, lineHeight:1, margin: "5px 0"}}>
                {duration} <div>hours</div>
              </div>
            </div>
            <div className={classes.logistic}>
              <div className={classes.logisticLabel}>Effort</div>
              <div style={{fontSize:30, margin: "3px 0"}}>
                {effort}
              </div>
            </div>
            <div className={classes.logistic}>
              <div className={classes.logisticLabel}>Satisfaction</div>
              <div style={{fontSize:30, margin: "3px 0"}}>
                {satisfaction}
              </div>
            </div>
          </div>
          {allReports}
        </div>
      );
    }

    function loadNoReport() {
      if (user.role.toLowerCase() === "coach")
      return (
          <div style={{color: "#777", width: "100%", textAlign:"center"}}>
              No reports completed.
          </div>
      );
      else return(
            <ReportModal
                workoutId={scheduledWorkout.id}
                mainWorkout={importedWorkout}
                updateMainWorkout={setImportedWorkout}
            ></ReportModal>
        )
    }

    function styleModifier(modifier) {
        const mod = modifier["modifier"].toLowerCase();
        if (mod === "sets" || mod === "reps") {
            return modifier["quantity"] + " " + mod
        }
        else if (mod === "intensity") {
            return modifier["quantity"] + "% intensity"
        }
        else {
            return modifier["quantity"] + " " + modifier["unit"]
        }
    }

    function formatDayDate(n) {
        let lastDigit = n % 10;
        let ordinal = "th";
        if (lastDigit === 1) ordinal = "st";
        else if (lastDigit === 2) ordinal = "nd";
        else if (lastDigit === 3) ordinal = "rd";

        // check if it's a "teen" number
        if ((n % 100) < 14 && (n % 100) > 10) ordinal = "th";

        return n + ordinal;
    }

    function formatDate(fullDate) {
        const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const trueDate = new Date(fullDate);
        const date = fullDate.split(" ")[0].split("-");
        let hour = fullDate.split(" ")[1].split(":")[0];
        const minute =fullDate.split(" ")[1].split(":")[1];
        const month = months[date[1] - 1];
        const dayDate = formatDayDate(parseInt(date[2]));
        const dayString = weekdays[trueDate.getDay()];

        let period = "am";

        if (hour >= 12) {
            period = "pm";
            hour -= 12;
        }
        if (hour == 0) hour = 12;
        return <div>
            {dayString}, {hour}:{minute} {period}<br></br>
            {month} {dayDate}
        </div>;
    }

    function generateScheduleData() {
        if (scheduledWorkout) {
            return (
                <div>
                    {importedWorkout["reports"].length === 0
                        ?loadNoReport()
                        :loadCompletedReport()
                    }
                                
                    <div id="logistics-container">
                        <div class="logistic-container">
                            <LocationOnIcon className={classes.logisticsIcon}></LocationOnIcon>
                            {importedWorkout["location"]}
                        </div>
                        <div class="logistic-container">
                            <ScheduleIcon className={classes.logisticsIcon}></ScheduleIcon>
                            {formatDate(importedWorkout.date)}
                            {/* Wed, 11am <br></br> Sep 18th */}
                        </div>
                    </div>

                    <div className={classes.tagsContainer}>
                        
                        {(typeof axiosData.tags !== "undefined")
                            ? axiosData.tags.map((tag) => (
                                <Chip label={tag.name} style={{margin: "0 2px"}}/>
                            ))
                            : null
                        }
                    </div>
                </div>
            );
        }
    }

    function addCheckCircle() {
        if (scheduledWorkout) {
            if (importedWorkout["reports"].length === 0) {
                return (
                    <CheckCircleOutlineIcon style={{marginLeft: 15, color: "#8ac290"}}
                    ></CheckCircleOutlineIcon>
                );
            }
        }     
    }

    return(
        <div id="calendar-workouts">
            <Header></Header>
            {/* {`workout id: ${baseWorkoutId}, `}
            {`user role: ${user.role}, `}
            {`scheduled workout: ${scheduledWorkout}`} */}
            {
                // later, we can add functions to sort data by order
                <div>
                    <h1 class="workout-title">{axiosData.title}{addCheckCircle()}</h1>

                    {generateScheduleData()}

                    <hr></hr>
                    <div id="plan-container">
                        <p id="plan-title">Plan</p>
                        {typeof axiosData.sections == "undefined"
                        ? null
                        : 
                        axiosData.sections.map((section) => (
                            <div class="section-container">
                                <div class="section-name">{section.name}</div>       
                                <Timeline class={classes.timeline}>    
                                    {(section.drills).map((drill, index) => (            
                                        <TimelineItem>
                                            <TimelineOppositeContent
                                                className={classes.oppositeContent}
                                            ></TimelineOppositeContent>
                                            {(index === section.drills.length - 1)
                                                ? <TimelineSeparator><TimelineDot variant="outlined" color="secondary"/></TimelineSeparator>
                                                : <TimelineSeparator><TimelineDot variant="outlined" color="secondary"/><TimelineConnector /></TimelineSeparator>}
                                            <TimelineContent>{
                                                <div>
                                                    {drill["drill_name"]}
                                                    <div>
                                                        {drill["modifiers"].map((modifier, index) => (
                                                            <span
                                                                style = {{
                                                                    color: "#777",
                                                                    paddingRight: 3
                                                                }}
                                                            >
                                                                {styleModifier(modifier)}
                                                                {index !== drill["modifiers"].length - 1 ? ", " : ""}
                                                            </span>
                                                            // `${modifier["quantity"]} ${modifier["unit"]}: , `
                                                        ))}
                                                    </div>
                                                </div>
                                            }</TimelineContent>
                                        </TimelineItem>
                                    ))}
                                </Timeline>
                            </div>
                        ))
                        }
                    </div>
                </div>
            }
        </div>
    )
}
