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

// icons
import ScheduleIcon from '@material-ui/icons/Schedule';
import LocationOnIcon from '@material-ui/icons/LocationOn';

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
    // width: 400,
    backgroundColor: theme.palette.background.paper,
    // border: '2px solid #000',
    // boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function SimpleModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState(new Date('2014-08-18T21:11:54'));
  const [selectedDates, setSelectedDates] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = (time) => {
    setSelectedTime(time);
  };

  function submitDates(dates) {
    setDatePickerOpen(false);
    setSelectedDates(dates);
  }

  function sendWorkoutJSON() {
    console.log(`dates: ${selectedDates}`);
    console.log(`time: ${selectedTime}`);
  }
  
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2>Schedule Workout</h2>
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
            />
        </MuiPickersUtilsProvider>
        <br></br>
      <Button variant="outlined" onClick={() => setDatePickerOpen(!datePickerOpen)}>
        Select Dates
      </Button>
      <MultipleDatesPicker
        open={datePickerOpen}
        selectedDates={[]}
        onCancel={() => setDatePickerOpen(false)}
        onSubmit={submitDates}
      />
      <br></br>
      <Button variant="outlined" onClick={sendWorkoutJSON}>
        Confirm Workout
      </Button>
    </div>
  );

  return (
    <div>
      <Button variant="outlined" onClick={handleOpen}>
        Schedule Workout
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
      >
        {body}
      </Modal>
    </div>
  );
}
