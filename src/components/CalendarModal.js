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
    KeyboardDatePicker,
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
  },
  desktopDateSelect: {
    [theme.breakpoints.down('xs')]: {
      display: "none",
    },
  },
  mobileDateSelect: {
    [theme.breakpoints.up('sm')]: {
      display: "none",
    },
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
  const [athleteData, setAthleteData] = useState([]);

  useEffect(() =>{
    const fetchAthletesListData = async () =>{
      const result = await axiosAPI.get('/users/');
      setAthleteData(result.data);
    };
    fetchAthletesListData();
  }, []);   

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

  function submitSingleDate(date) {
    console.log(date)
    setSelectedDates([date]);
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
            style={{
              width: "130px",
              marginRight: 30
            }}
            />
      </MuiPickersUtilsProvider>
      <TextField label="Location" value={location} onChange={handleLocationChange}></TextField>
    </div>
    <div>
      <div className={classes.desktopDateSelect}>
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
          fullWidth
        />
      </div>
      <div class={classes.mobileDateSelect} style={{textAlign: "center", marginTop: 10}}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="MM/dd/yyyy"
            margin="dense"
            label="Select Date"
            value={selectedDates[0]}
            onChange={submitSingleDate}
          />
        </MuiPickersUtilsProvider>
      </div>
    </div>

    {workoutSelect(props)}
    {/* athlete select */}
    <div className={classes.formLabel}>Select Athletes</div>
    {/* {JSON.stringify(athleteData)} */}
    <div
      style={{minHeight: 300, width: '90%', margin:"auto"}}
      >
      <DataGrid
        // hideFooter
        rows={athleteData}
        columns={columns}
        checkboxSelection 
        onSelectionChange={(newSelection) => {
          setSelectedAthleteIds(newSelection.rowIds);
        }}
        pageSize={5}
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
