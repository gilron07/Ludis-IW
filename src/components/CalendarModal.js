import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import MultipleDatesPicker from '@randex/material-ui-multiple-dates-picker';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import axiosAPI from '../services/authAxios'

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
    // backgroundColor: "green"
  },
  dialog: {
    backgroundColor: "red",
  },
  formControl: {
    border: "1px solid #00000044",
    minHeight: 50,
    maxHeight: 300,
    overflow: "scroll",
    width: "calc(90% - 25px)",
    margin: "auto",
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
  },
  formLabel : {
    color: "#00000088",
    margin: "20px 0 5px 0",
    textAlign:"center"
  }
}));

export default function SimpleModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date(Date.UTC(2020, 0, 1)));
  const [selectedDates, setSelectedDates] = useState([]);
  const [location, setLocation] = useState("Remote");
  const [selectedAthleteIds, setSelectedAthleteIds] = useState([]);
  const [workoutValue, setWorkoutValue] = React.useState(null);

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

  function ScheduleJSON() {
    // prepare athlete ids
    let athleteIds = selectedAthleteIds;
    for(var i = 0; i < athleteIds.length; i++) {
      athleteIds[i] = parseInt(athleteIds[i]);
    }

    // prepare date and time
    let newDates = [];
    for (let i = 0; i < selectedDates.length; i++) {
      let date = new Date(selectedDates[i].getTime());
      const hours = selectedTime.getHours();
      const minutes = selectedTime.getMinutes();
      date.setUTCHours(hours);
      date.setUTCMinutes(minutes);
      newDates.push(date.toISOString());
    }

    let scheduleJSON = {
      "location": location,
      "dates": newDates,
      "workout_id": workoutValue,
      "athletes_ids": athleteIds
    }

    return scheduleJSON
  }

  function createSchedule(){
      const data = ScheduleJSON();
      axiosAPI.post('/schedule/', data)
          .then(() => {
              axiosAPI.get('/schedule/')
                  .then((res) => {
                      props.updateSchdeule(res.data);
                  })
                  .catch((err) =>{
                      console.log(err)
                  });
              handleClose();
          })
          .catch((err) => {
             console.log(err);
          });
  }

  function workoutSelect(props) {
    return(
      <div>
        <div className={classes.formLabel}>Select Workout</div>
        <div className={classes.formControl} style={{paddingLeft: 20}}>
          <FormControl component="fieldset">
            <RadioGroup
              value={workoutValue}
              onChange={handleWorkoutChange}
            >
              {props.workoutsList.map((workout, index) => (
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
          {props.workoutsList.length == 0
            ? <div style={{textAlign: "center", fontSize: 14, marginLeft: -20}}>No Workouts Created</div>
            : null
          }
        </div>
      </div>
    )
  }

  function formatSelectedDates() {
    const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let finalDates = [];

    console.log(selectedDates);

    let selectedMiliseconds = [...selectedDates];

    for (let i = 0; i < selectedMiliseconds.length; i++) {
      selectedMiliseconds[i] = selectedMiliseconds[i].getTime();
    }

    

    let sortedDates = [...selectedMiliseconds];
    sortedDates = sortedDates.sort();

    for (let i = 0; i < sortedDates.length; i++) {
      let newDate = new Date(sortedDates[i])
      let stringDate = newDate.toISOString().split("T")[0].split("-");
      let day = newDate.getDay();
      stringDate = weekDays[day] + ", " + stringDate[1] + "/" + stringDate[2] + "/" + stringDate[0]
      finalDates.push(stringDate)
    }

    return (<div>
      {finalDates.map((date) => (
        <div>{date}<hr style={{backgroundColor: "#CCC", height: 1, border: "none"}}></hr></div>
      ))}
    </div>);
  }
  
const body = (
  <div style={modalStyle} className={classes.paper}>
    <h2>Schedule Workout</h2>
    <div style={{display: "flex", justifyContent:"center", alignItems: "center"}}>
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
      <TextField label="Location" value={location} onChange={handleLocationChange}></TextField>
    </div>
    <div>
      <div style={{display:"flex", justifyContent: "center", marginTop: 10}}>
        <Button
          variant="outlined"
          onClick={() => setDatePickerOpen(!datePickerOpen)}
          style={{ height: 30, marginTop: "20px", whiteSpace:"nowrap", overflow:"hidden"}}
        >
          Select Dates
        </Button>
      </div>
      <div className={classes.formLabel}>Selected Dates</div>
      <div className={classes.formControl} style={{textAlign: "center", paddingTop: 10}}>
        {formatSelectedDates()}
      </div>

      <MultipleDatesPicker
        open={datePickerOpen}
        selectedDates={[]}
        onCancel={() => setDatePickerOpen(false)}
        onSubmit={submitDates}

      />
    </div>

    {workoutSelect(props)}
    {/* athlete select */}
    <div className={classes.formLabel}>Select Athletes</div>
    <div style={{minHeight: 100, maxHeight: "25vw", width: '90%', margin:"auto", overflow: "scroll"}}>
      <DataGrid
        hideFooter
        rows={props.athletesList}
        columns={columns}
        checkboxSelection 
        onSelectionChange={(newSelection) => {
          setSelectedAthleteIds(newSelection.rowIds);
        }}
        style={{overflow: "scroll"}}
      />
    </div>
    
    <div style={{textAlign:"center", margin:"30px 0 10px 0"}}>
      <Button variant="contained" color="primary" onClick={createSchedule}>
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
  { field: 'full_name', headerName: 'Athlete Name', width: 400 },
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

//
// const workoutData = [
//   {
//       "id": 1,
//       "title": "Technical Practice",
//       "created_at": "2020-11-09",
//       "description": "Please come with appropriate spikes",
//       "tags": [{"name" : "test tag"}],
//       "sections": [
//           {
//               "id": 1,
//               "name": "warm up",
//               "order": 1,
//               "drills": [
//                   {
//                       "id": 1,
//                       "drill_name": "B-skips",
//                       "created_at": "2020-10-31T15:59:20.246136Z",
//                       "order": 1,
//                       "modifiers": [
//                           {
//                               "id": 1,
//                               "modifier": "Reps",
//                               "unit": null,
//                               "quantity": 5
//                           },
//                           {
//                               "id": 2,
//                               "modifier": "Time",
//                               "unit": "minutes",
//                               "quantity": 5
//                           }
//                       ]
//                   }
//               ]
//           }
//       ],
//       "owner": "Henry Herrington"
//   },
//   {
//       "id": 2,
//       "title": "Running Practice",
//       "created_at": "2020-11-09",
//       "description": "Wear running shoes",
//       "tags": [
//           {
//               "name": "cardio"
//           },
//           {
//               "name": "technical 2"
//           }
//       ],
//       "sections": [
//           {
//               "id": 2,
//               "name": "warm up",
//               "order": 1,
//               "drills": [
//                   {
//                       "id": 2,
//                       "drill_name": "Sprints",
//                       "created_at": "2020-11-09T20:13:00.205946Z",
//                       "order": 1,
//                       "modifiers": [
//                           {
//                               "id": 3,
//                               "modifier": "Reps",
//                               "unit": null,
//                               "quantity": 5
//                           },
//                           {
//                               "id": 4,
//                               "modifier": "Time",
//                               "unit": "minutes",
//                               "quantity": 5
//                           }
//                       ]
//                   }
//               ]
//           }
//       ],
//       "owner": "Henry Herrington"
//   },
//   {
//     "id": 3,
//     "title": "Swimming Practice",
//     "created_at": "1999-02-09",
//     "description": "Wear running shoes",
//     "tags": [
//         {
//             "name": "repetition"
//         },
//         {
//             "name": "non technical"
//         }
//     ],
//     "sections": [],
//     "owner": "Henry Herrington"
// },
// {
//   "id": 4,
//   "title": "Walking Practice",
//   "created_at": "1999-02-09",
//   "description": "Wear running shoes",
//   "tags": [
//       {
//           "name": "cardio"
//       },
//   ],
//   "sections": [],
//   "owner": "Henry Herrington"
// },
// {
//   "id": 5,
//   "title": "Scuba Practice",
//   "created_at": "1999-02-09",
//   "description": "Wear running shoes",
//   "tags": [
//       {
//           "name": "underwater"
//       },
//       {
//           "name": "technical 44"
//       }
//   ],
//   "sections": [],
//   "owner": "Henry Herrington"
// },
// {
//   "id": 6,
//   "title": "Sleeping Practice",
//   "created_at": "1999-02-09",
//   "description": "Wear running shoes",
//   "tags": [
//       {
//           "name": "cardio"
//       },
//       {
//           "name": "technical 2"
//       }
//   ],
//   "sections": [],
//   "owner": "Henry Herrington"
// },
// ]