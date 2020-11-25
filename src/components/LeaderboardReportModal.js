import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';

// radio buttons
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

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
    width: "40vw",
    maxWidth: 500,
    minWidth: 250,
    minHeight: 200,
    maxHeight: "40vh",
    overflow: "scroll",
    backgroundColor: theme.palette.background.paper,
    padding: "16px 35px",
  }
}));

export default function LeaderboardReportModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const [newRecord, setNewRecord] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateRecord = (event) => {
    setNewRecord(event.target.value)
  }

  function sendJSON() {
    console.log(`leaderboard id: ${props.id}`);
    console.log(`new record: ${newRecord}`)
  }

  const body = (
      <div style={modalStyle} className={classes.paper}>
        <h2>Add New Record</h2>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
          <TextField
            type="number"
            value={newRecord}
            onChange={updateRecord}
            label="New Record"
            style={{
              width: "80%",
              margin: "0 0 30px 0"
            }}
          ></TextField>
          <div style={{marginLeft: 10}}>
            {props.unit.toLowerCase()}
          </div>
        </div>

        <div style={{textAlign:"center"}}>
          <Button variant="contained" color="primary" onClick={sendJSON}>
            Submit Record
          </Button>
        </div>
      </div>
  );

  return (

    <div style={{ textAlign: "right", margin: "5px 15px 0 0"}}>
      <div style={{
          fontSize: 15,
          color: "white",
          backgroundColor:"#41C3A7",
          borderRadius: 20,
          display: "inline",
          padding: "0 10px",
          }}
        onClick={handleOpen}
      >Add Record</div>
      <Modal
        open={open}
        onClose={handleClose}
      >
        {body}
      </Modal>
    </div>
  );
}
