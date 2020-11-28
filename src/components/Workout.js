import React, { useContext, useState, useEffect } from 'react';
import Header from './Header.js';
import ReportModal from './ReportModal.js';
import {UserContext} from "../services/UserContext";

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
      let duration, effort, satisfaction, average;
      
      // athlete view else coach view
      if (user.role.toLowerCase() === "athlete") {
        duration = importedWorkout["reports"][0]["duration"];
        effort = importedWorkout["reports"][0]["effort"];
        satisfaction = importedWorkout["reports"][0]["satisfaction"];
        average="";
      }
      else {
        duration = importedWorkout["average_duration"];
        effort = importedWorkout["average_effort"];
        satisfaction = importedWorkout["average_satisfaction"];
        average="Averages";
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
        else if (mod === "distance" || mod === "time" || mod === "weight") {
            return modifier["quantity"] + " " + modifier["unit"]
        }
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
                            Wed, 11am <br></br> Sep 18th
                        </div>
                    </div>

                    <div id="tags-container">
                        <Chip label="Technical" /> <Chip label="Conditioning" />
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
            {console.log(JSON.stringify(axiosData.sections))}
            {/* {JSON.stringify(importedWorkout)} */}
            {`workout id: ${baseWorkoutId}, `}
            {`user role: ${user.role}, `}
            {`scheduled workout: ${scheduledWorkout}`}
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
                                                    <div style={{paddingLeft: 20}}>
                                                        {drill["modifiers"].map((modifier, index) => (
                                                            <span
                                                                style = {{
                                                                    color: "#777",
                                                                    paddingLeft: 5
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

// need to fetch this workout plan based on id in the specific workout JSON (coachWorkout or athleteJSON)
const data = {
    "id": 1,
    "title": "Technical Practice",
    "description": "Please come with appropriate spikes",
    "sections": [
        {
            "id": 1,
            "name": "Warm Up",
            "order": 1,
            "drills": [
                {
                    "id": 1,
                    "drill_name": "B-skips",
                    "created_at": "2020-10-31T15:59:20.246136Z",
                    "order": 1,
                    "modifiers": [
                        {
                            "id": 1,
                            "modifier": "Sets",
                            "quantity": 15,
                            "unit": null
                        },
                        {
                            "id": 1,
                            "modifier": "Intensity",
                            "quantity": 15,
                            "unit": null
                        },
                        {
                            "id": 1,
                            "modifier": "Time",
                            "quantity": 5,
                            "unit": "hours"
                        },
                        {
                            "id": 2,
                            "modifier": "Distance",
                            "quantity": 50,
                            "unit": "miles"
                        }
                    ]
                }
            ]
        }, 
        {
            "id": 2,
            "name": "Cool Down",
            "order": 2,
            "drills": [
                {
                    "id": 1,
                    "drill_name": "Slow Running",
                    "created_at": "2020-10-31T15:59:20.246136Z",
                    "order": 1,
                    "modifiers": [
                        {
                            "id": 1,
                            "modifier": "Reps",
                            "quantity": 5,
                            "unit": null
                        },
                        {
                            "id": 2,
                            "modifier": "Time",
                            "quantity": 7,
                            "unit": "minutes"
                        }
                    ]
                },
                {
                    "id": 2,
                    "drill_name": "Yoga",
                    "created_at": "2020-10-31T15:59:20.246136Z",
                    "order": 1,
                    "modifiers": [
                        {
                            "id": 1,
                            "modifier": "Reps",
                            "quantity": 4,
                            "unit": null
                        },
                        {
                            "id": 2,
                            "modifier": "Time",
                            "quantity": 70,
                            "unit": "minutes"
                        }
                    ]
                }
            ]
        }
    ],
    "owner": "Henry Herrington"
}


// const coachWorkout = {
//     "id": 17,
//     "notes": null,
//     "workout": {
//         "id": 18,
//         "title": "Sprints Tuesday Wokrout",
//         "owner": "Gilron Tsabkevich",
//         "tags": [
//             {
//                 "name": "sprints"
//             },
//             {
//                 "name": "technical"
//             }
//         ]
//     },
//     "owner": "Gilron Tsabkevich",
//     "location": "Jadwin",
//     "athletes": [
//         {
//             "athlete": "Avner Volpert",
//             "athlete_id": 3
//         }
//     ],
//     "reports": [
//         {
//             "id": 1,
//             "duration": "2.50",
//             "effort": 8,
//             "satisfaction": 10,
//             "athlete": 1,
//             "athlete_name": "Gilron Tsabkevich"
//         }
//     ],
//     "average_effort": "8.00",
//     "average_duration": "2.50",
//     "average_satisfaction": "10.00"
// }

// const athleteWorkout = {
//     "id": 16,
//     "notes": null,
//     "workout": {
//         "id": 18,
//         "title": "Sprints Tuesday Wokrout",
//         "owner": "Gilron Tsabkevich",
//         "tags": [
//             {
//                 "name": "sprints"
//             },
//             {
//                 "name": "technical"
//             }
//         ]
//     },
//     "owner": "Gilron Tsabkevich",
//     "location": "Jadwin",
//     "athletes": [
//         {
//             "athlete": "Avner Volpert",
//             "athlete_id": 3
//         }
//     ],
//     "reports": [
//         // {
//         //     "id": 2,
//         //     "duration": "1.50",
//         //     "effort": 2,
//         //     "satisfaction": 3,
//         //     "athlete": 3,
//         //     "athlete_name": "Avner Volpert"
//         // }
//     ]
// }
