import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

// slider
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

// icons
import AddCircleIcon from '@material-ui/icons/AddCircle';
import MoodIcon from '@material-ui/icons/Mood';
import MoodBadIcon from '@material-ui/icons/MoodBad';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: "70vw",
    minHeight: "70vh",
    maxHeight: "80vh",
    overflow: "scroll",
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
  },
  slider : {
      marginBottom: "45px",
  }
}));

export default function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const [duration, setDuration] = useState(0);
  const [effort, setEffort] = useState(null);
  const [satisfaction, setSatisfaction] = useState(null);

  const handleOpen = () => { 
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function handleDurationChange(event, value) {
    setDuration(value);
  };

  function handleEffortChange(event, value) {
    setEffort(value);
  };

  function handleSatisfactionChange(event, value) {
    setSatisfaction(value);
  };

  function sendReportJSON() {
    console.log(`duration: ${duration}`);
    console.log(`effort: ${effort}`);
    console.log(`satisfaction: ${satisfaction}`);
  }

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2>Rate Workout</h2>
      <div style={{textAlign:"center", width: "80%", margin:"auto"}}>
        <Typography style={{textAlign:"left"}}>Duration</Typography>
        <Slider
            className={classes.slider}
            value={duration}
            onChange={handleDurationChange}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={15}
            marks={durationMarks}
            min={0}
            max={120}
        />
        <Typography style={{textAlign:"left"}}>Effort</Typography>
        <Slider
            className={classes.slider}
            value={effort}
            onChange={handleEffortChange}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            marks={effortMarks}
            min={0}
            max={10}
        />
        <Typography style={{textAlign:"left"}}>Satisfaction</Typography>
        <Slider
            className={classes.slider}
            value={satisfaction}
            onChange={handleSatisfactionChange}
            aria-labelledby="discrete-slider"
            valueLabelDisplay="auto"
            step={1}
            marks={satisfactionMarks}
            min={0}
            max={10}
        />
      </div>
      <div style={{textAlign:"center", margin:"30px 0 10px 0"}}>
        <Button variant="contained" color="primary" onClick={sendReportJSON}>
          Rate Workout
        </Button>
      </div>
    </div>
  );

  return (
    <div style={{ textAlign: "center"}}>
      <AddCircleIcon color="primary" style={{ fontSize: 40 }} onClick={handleOpen}></AddCircleIcon>
      <Modal
        open={open}
        onClose={handleClose}
      >
        {body}
      </Modal>
    </div>
  );
}

const durationMarks = [
    {value: 0, label: '0 mins'},
    {value: 30, label: '30 mins'},
    {value: 60, label: '1 hour'},
    {value: 90,label: '90 mins'},
    {value: 120,label: '2 hours +'}
];

const effortMarks = [
    {value: 0, label: 'No effort'},
    {value: 10, label: 'Full effort'},
];

const satisfactionMarks = [
    {value: 0, label: <MoodBadIcon style={{color:"#00000066"}}></MoodBadIcon>},
    {value: 10, label: <MoodIcon style={{color:"#00000066"}}></MoodIcon>},
];

const workoutData = [
  {
      "id": 1,
      "title": "Technical Practice",
      "created_at": "2020-11-09",
      "description": "Please come with appropriate spikes",
      "tags": [],
      "sections": [
          {
              "id": 1,
              "name": "warm up",
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
                              "unit": null,
                              "quantity": 5
                          },
                          {
                              "id": 2,
                              "modifier": "Time",
                              "unit": "minutes",
                              "quantity": 5
                          }
                      ]
                  }
              ]
          }
      ],
      "owner": "Henry Herrington"
  },
  {
      "id": 2,
      "title": "Running Practice",
      "created_at": "2020-11-09",
      "description": "Wear running shoes",
      "tags": [
          {
              "name": "cardio"
          },
          {
              "name": "technical 2"
          }
      ],
      "sections": [
          {
              "id": 2,
              "name": "warm up",
              "order": 1,
              "drills": [
                  {
                      "id": 2,
                      "drill_name": "Sprints",
                      "created_at": "2020-11-09T20:13:00.205946Z",
                      "order": 1,
                      "modifiers": [
                          {
                              "id": 3,
                              "modifier": "Reps",
                              "unit": null,
                              "quantity": 5
                          },
                          {
                              "id": 4,
                              "modifier": "Time",
                              "unit": "minutes",
                              "quantity": 5
                          }
                      ]
                  }
              ]
          }
      ],
      "owner": "Henry Herrington"
  },
  {
    "id": 3,
    "title": "Swimming Practice",
    "created_at": "1999-02-09",
    "description": "Wear running shoes",
    "tags": [
        {
            "name": "cardio"
        },
        {
            "name": "technical 2"
        }
    ],
    "sections": [],
    "owner": "Henry Herrington"
},
{
  "id": 4,
  "title": "Walking Practice",
  "created_at": "1999-02-09",
  "description": "Wear running shoes",
  "tags": [
      {
          "name": "cardio"
      },
      {
          "name": "technical 2"
      }
  ],
  "sections": [],
  "owner": "Henry Herrington"
},
{
  "id": 5,
  "title": "Scuba Practice",
  "created_at": "1999-02-09",
  "description": "Wear running shoes",
  "tags": [
      {
          "name": "cardio"
      },
      {
          "name": "technical 2"
      }
  ],
  "sections": [],
  "owner": "Henry Herrington"
},
{
  "id": 6,
  "title": "Sleeping Practice",
  "created_at": "1999-02-09",
  "description": "Wear running shoes",
  "tags": [
      {
          "name": "cardio"
      },
      {
          "name": "technical 2"
      }
  ],
  "sections": [],
  "owner": "Henry Herrington"
},
]