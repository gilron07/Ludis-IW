import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import MultipleDatesPicker from '@randex/material-ui-multiple-dates-picker';
import TextField from '@material-ui/core/TextField';

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
    padding: theme.spacing(2, 4, 3),
  },
  formControl: {
    border: "1px solid #00000044",
    height: "20vh",
    overflow: "scroll",
  },
  workoutTitle : {
    width: "30vw",
    whiteSpace: "nowrap",
    overflow: "hidden",
    // backgroundColor: "red",
    display: "inline-block",
  },
  workoutDate : {
    width: "18vw",
    whiteSpace: "nowrap",
    overflow: "hidden",
    // backgroundColor: "red",
    display: "inline-block",
  }
}));

export default function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date('2014-08-18T21:11:54'));
  const [selectedDates, setSelectedDates] = useState("");
  const [selectedAthleteIds, setSelectedAthleteIds] = useState(null);
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

  const handleWorkoutChange = (event) => {
    setWorkoutValue(event.target.value);
  };

  function submitDates(dates) {
    setDatePickerOpen(false);
    setSelectedDates(dates);
  }

  function sendWorkoutJSON() {
    console.log(`dates: ${selectedDates}`);
    console.log(`time: ${selectedTime}`);
    console.log(`workout id: ${workoutValue}`);
    {teamOrIndividual ?
      console.log(`assign to: ${selectedAthleteIds}`) : console.log(`assign to: team`)
    }
  
  }
  
  function workoutSelect() {  
    return(
      <FormControl component="fieldset">
      <FormLabel component="legend">Select Workout</FormLabel>
      <RadioGroup
        value={workoutValue}
        onChange={handleWorkoutChange}
      >
        <div className={classes.formControl}>
        {workoutData.map((workout, index) => (
           <FormControlLabel
           value= {workout.id.toString()}
           control={<Radio size="small"/>}
           label= {
            <div style={{lineHeight:1, marginTop: 3}}>
              <div className={classes.workoutTitle}>{workout.title}</div>
              <div className={classes.workoutDate}>{workout.created_at}</div>
            </div>
           }
         />
        ))}
       </div>
      </RadioGroup>
    </FormControl>
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
        style={{ height: 30, margin: "20px 0 0 30px"}}
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
      <br></br>
      {workoutSelect()}
      {/* athlete select */}
      <div style={{color: "#00000088", margin: "20px 0 10px 0", textAlign:"center"}}>Assign workout to: </div>
      <div style={{display: "flex", justifyContent:"center"}}>
        {teamOrIndividual
          ? <Button variant="contained" style={{height: 30, margin: "0 10px"}} onClick={toggleTeamOrIndividual} id={0}>All Athletes</Button>
          : <Button color="primary" variant="contained" style={{height: 30, margin: "0 10px"}} onClick={toggleTeamOrIndividual} id={0}>All Athletes</Button>
        }
        {teamOrIndividual
          ? <Button color="primary" variant="contained" style={{height: 30, margin: "0 10px"}} onClick={toggleTeamOrIndividual} id={1}>Individuals</Button>
          : <Button variant="contained" style={{height: 30, margin: "0 10px"}} onClick={toggleTeamOrIndividual} id={1}>Individuals</Button>
        }
      </div>
      {teamOrIndividual
          ? <div style={{ height: 300, width: '100%', marginTop:25 }}>
              <DataGrid
                rows={rows}
                columns={columns}
                pageSize={5}
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
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
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

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
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