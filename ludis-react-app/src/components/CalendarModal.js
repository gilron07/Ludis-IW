import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import MultipleDatesPicker from '@randex/material-ui-multiple-dates-picker';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';

// time picker
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
  } from '@material-ui/pickers';

// radio buttons and data grid
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { DataGrid } from '@material-ui/data-grid';

// icons
import AddCircleIcon from '@material-ui/icons/AddCircle';

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
    padding: "16px 35px",
  },
  formControl: {
    border: "1px solid #00000044",
    height: "25vh",
    overflow: "scroll",
    padding: "0 0 0 20px",
  },
  workoutTitle : {
    height: "23px",
    width: "25vw",
    minWidth: "175px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    display: "inline-block",
  },
  workoutTags : {
    width: "25vw",
    minWidth: "200px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    display: "inline-block",
  },
  workoutDate : {
    height: "23px",
    width: "50px",
    minWidth: "100px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    display: "inline-block",
  },
  workoutLine : {
    lineHeight:1,
    marginTop: 3,
    overflow: "hidden",
    whiteSpace: "nowrap",
  }
}));

export default function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date('2014-08-18T12:00:00'));
  const [selectedDates, setSelectedDates] = useState([]);
  const [location, setLocation] = useState(null);
  const [selectedAthleteIds, setSelectedAthleteIds] = useState([]);
  const [workoutValue, setWorkoutValue] = React.useState(null);
  const [teamOrIndividual, setTeamOrIndividual] = React.useState(0);


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (time) => {
    setSelectedTime(time);
  };

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  };

  const handleWorkoutChange = (event) => {
    setWorkoutValue(event.target.value);
  };

  function submitDates(dates) {
    setDatePickerOpen(false);
    setSelectedDates(dates);
  }

  function sendWorkoutJSON() {
    // prepare athlete ids
    let athleteIds = selectedAthleteIds;
    for(var i = 0; i < athleteIds.length; i++) {
      athleteIds[i] = parseInt(athleteIds[i]);
    }
    if (!teamOrIndividual) athleteIds = "fullTeam";

    // prepare date and time
    let newDates = [];
    for (let i = 0; i < selectedDates.length; i++) {
      newDates.push(new Date(selectedDates[i].getTime() + 60000 * (60 * selectedTime.getHours() + selectedTime.getMinutes())).toISOString());
    }

    let scheduleJSON = {
      "location": location,
      "dates": newDates,
      "workout_id": workoutValue,
      "athletes_ids": athleteIds
    }
    
    console.log(scheduleJSON);
  }
  
  function workoutSelect() {  
    return(
      <div>
        <FormLabel component="legend">Select Workout</FormLabel>
      <div className={classes.formControl}>
        <FormControl component="fieldset">
        <RadioGroup
          value={workoutValue}
          onChange={handleWorkoutChange}
        >
          {workoutData.map((workout, index) => (
            <FormControlLabel
            value= {workout.id.toString()}
            control={<Radio size="small"/>}
            label= {
              <div className={classes.workoutLine}>
                <div className={classes.workoutTitle}>{workout.title}</div>
                <div className={classes.workoutTags}>
                  {workout.tags.map((tag) => (
                    <Chip label={tag.name} style={{margin:"0 2px"}}></Chip>
                  ))}
                </div>
                <div className={classes.workoutDate}>{workout.created_at}</div>
              </div>
            }
          />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
    </div>
    )
  }

  const toggleTeamOrIndividual = (e) => {
    if (typeof e.currentTarget.id !== "string") return;
    setTeamOrIndividual(parseInt(e.currentTarget.id));
}
  
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2>Schedule Workout</h2>
      <div style={{display: "flex", justifyContent:"center"}}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardTimePicker
            margin="dense"
            id="time-picker"
            label="Workout Time"
            value={selectedTime}
            onChange={handleDateChange}
            KeyboardButtonProps={{
                'aria-label': 'change time',
            }}
            style={{
              width: "130px",
              marginRight: 30
            }}
            />
        </MuiPickersUtilsProvider>
      <Button
        variant="outlined"
        onClick={() => setDatePickerOpen(!datePickerOpen)}
        style={{ height: 30, margin: "20px 0 0 30px", whiteSpace:"nowrap", overflow:"hidden"}}
      >
        Select Dates
      </Button>
      </div>
      <MultipleDatesPicker
        open={datePickerOpen}
        selectedDates={[]}
        onCancel={() => setDatePickerOpen(false)}
        onSubmit={submitDates}
      />
      <div style={{display:"flex", justifyContent: "center", marginTop: 10}}>
        <TextField label="Location" value={location} onChange={handleLocationChange}></TextField>
      </div>
      <br></br>
      {workoutSelect()}
      {/* athlete select */}
      <div style={{color: "#00000088", margin: "20px 0 10px 0", textAlign:"center"}}>Assign workout to: </div>
      <div style={{display: "flex", justifyContent:"center"}}>
        {teamOrIndividual
          ? <Button
              variant="contained"
              style={{height: 30, margin: "0 10px", whiteSpace:"nowrap", overflow:"hidden"}}
              onClick={toggleTeamOrIndividual} id={0}
            >
              All Athletes
            </Button>
          : <Button
              color="primary"
              variant="contained"
              style={{height: 30, margin: "0 10px", whiteSpace:"nowrap", overflow:"hidden"}}
              onClick={toggleTeamOrIndividual}
              id={0}
            >
              All Athletes
            </Button>
        }
        {teamOrIndividual
          ? <Button
              color="primary"
              variant="contained"
              style={{height: 30, margin: "0 10px", overflow:"hidden"}}
              onClick={toggleTeamOrIndividual}
              id={1}
            >Individuals
            </Button>
          : <Button
              variant="contained"
              style={{height: 30, margin: "0 10px", overflow:"hidden"}}
              onClick={toggleTeamOrIndividual}
              id={1}
            >Individuals
            </Button>
        }
      </div>
      {teamOrIndividual
          ? <div style={{height: 300, width: '90%', minWidth:"300px", paddingTop:25, margin:"auto"}}>
              <DataGrid
                rows={athleteData}
                columns={columns}
                checkboxSelection 
                onSelectionChange={(newSelection) => {
                  setSelectedAthleteIds(newSelection.rowIds);
                }}
              />
            </div>
          : null
        }
      
      <div style={{textAlign:"center", margin:"30px 0 10px 0"}}>
        <Button variant="contained" color="primary" onClick={sendWorkoutJSON}>
          Schedule Workout
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

const columns = [
  { field: 'name', headerName: 'Athlete Name', width: 400 },
  // {
  //   field: 'age',
  //   headerName: 'Age',
  //   type: 'number',
  //   width: 90,
  // },
  // {
  //   field: 'fullName',
  //   headerName: 'Full name',
  //   description: 'This column has a value getter and is not sortable.',
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params) =>
  //     `${params.getValue('firstName') || ''} ${params.getValue('lastName') || ''}`,
  // },
];

const athleteData = [
  { id: 1, name: 'Henry Herrington'},
  { id: 2, name: 'Gilron Tsabkevich'},
  { id: 3, name: 'Miles Tuncel'},
  { id: 4, name: 'Rebecca Drachman'},
  { id: 5, name: 'August VanNewkirk'},
  { id: 6, name: 'Noah Schwartz'},
  { id: 7, name: 'Edward Oppenheimer Boyer-Rogers III'},
  { id: 8, name: 'Ben Schwartz'},
];


const workoutData = [
  {
      "id": 1,
      "title": "Technical Practice",
      "created_at": "2020-11-09",
      "description": "Please come with appropriate spikes",
      "tags": [{"name" : "test tag"}],
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
            "name": "repetition"
        },
        {
            "name": "non technical"
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
          "name": "underwater"
      },
      {
          "name": "technical 44"
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