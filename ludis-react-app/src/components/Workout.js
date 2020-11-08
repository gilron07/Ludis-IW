import React from 'react';
import Header from './Header.js';

// Material UI components
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

// Timeline imports
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
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
    }
}));

function getData() {
    const workout = {
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
                                "modifier": "Reps",
                                "unit": null
                            },
                            {
                                "id": 2,
                                "modifier": "Time",
                                "unit": "minutes"
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
                                "unit": null
                            },
                            {
                                "id": 2,
                                "modifier": "Time",
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
                                "unit": null
                            },
                            {
                                "id": 2,
                                "modifier": "Time",
                                "unit": "minutes"
                            }
                        ]
                    }
                ]
            }
        ],
        "owner": "Henry Herrington"
    }

    return workout;
}

function Workout() {
    const classes = useStyles();
    const data = getData();

    return(
        <div id="calendar-workouts">
            <Header></Header>
            
            {
                // later, we can add functions to sort data by order
                <div>
                    <h1 class="workout-title">{data.title}</h1>
                    <p class="workout-description">{data.description}</p>
                    <div id="coaches-only-container">
                        <div id="inputs-container">
                            <div class="input-container">
                                Duration<br></br>
                                <div id="time-container">
                                    <TextField type="number" id="time-input"/>
                                </div>
                            </div>
                            <div class="input-container">
                                Effort
                                <div id="effort-container">
                                    <TextField type="number" id="effort-input"/>
                                </div>
                            </div>
                            <div class="input-container">
                                Satisfaction
                                <div id="satisfaction-container">
                                    <TextField type="number" id="satisfaction-input"/>
                                </div>
                            </div>
                        </div>

                        <div id="logistics-container">
                            <div class="logistic-container">
                                <LocationOnIcon className={classes.logisticsIcon}></LocationOnIcon>
                                Jadwin Gym
                            </div>
                            <div class="logistic-container">
                                <ScheduleIcon className={classes.logisticsIcon}></ScheduleIcon>
                                Wed, 11am <br></br> Sep 18th
                            </div>
                            <div class="logistic-container">
                                <CheckCircleOutlineIcon className={classes.logisticsIcon}></CheckCircleOutlineIcon>
                                Completed
                            </div>
                        </div>
                    </div>
    
                    <div id="tags-container">
                        <Chip label="Technical" /> <Chip label="Conditioning" />
                    </div>

                    <hr></hr>
                    <div id="plan-container">
                        <p id="plan-title">Plan</p>
                        {getData().sections.map((section) => (
                            <div class="section-container">
                            <div class="section-name">{section.name}</div>
                            
                            <Timeline>    
                            {(section.drills).map((drill, index) => (            
                                <TimelineItem>
                                    <TimelineSeparator><TimelineDot /><TimelineConnector /></TimelineSeparator>
                                    <TimelineContent>{drill.drill_name}</TimelineContent>
                                </TimelineItem>
                            ))}
                            </Timeline>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}

export default Workout;