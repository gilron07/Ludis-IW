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
    minHeight: "70vh",
    maxHeight: "80vh",
    overflow: "scroll",
    backgroundColor: theme.palette.background.paper,
    padding: "16px 35px",
  }
}));

export default function LeaderboardModal() {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);

  const [leaderboardTitle, setLeaderboardTitle] = useState("");
  const [modifierType, setModifierType] = useState("weight");
  const [modifierUnit, setModifierUnit] = useState("null");
  const [rankOrder, setRankOrder] = React.useState("high");

  const units = {
    "weight": ["lb", "kg"],
    "time": ["hours", "minutes", "seconds"],
    "distance": ["miles", "kilometers", "meters", "laps"],
    "intensity": null,
    "sets": null,
    "reps": null
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateTitle = (event) => {
    setLeaderboardTitle(event.target.value)
  }

  function handleModifierTypeChange(e) {    
    setModifierType(e.target.value);
  }

  function handleModifierUnitChange(e) {    
    setModifierUnit(e.target.value);
  }

  const handleRankOrder = (event) => {
    setRankOrder(event.target.value);
  };

  function generateUnitSelect() {
    if (units[modifierType] !== null) {
      return(
        <NativeSelect
            value = {modifierUnit}
            onChange = {handleModifierUnitChange}
        >
            {units[modifierType].map((unit) => (
                <option value={unit.toLowerCase()}>{unit}</option>
            ))}
        </NativeSelect>
      )
    }
  }

  function sendLeaderboardJSON() {
    const leaderboard = {
      "title" : leaderboardTitle,
      "metric" : modifierType,
      "unit" : modifierUnit,
      "order" : rankOrder
    }

    console.log(JSON.stringify(leaderboard));
  }

  const body = (
      <div style={modalStyle} className={classes.paper}>
        <h2>Create New Leaderboard</h2>
        <div style={{ display: "flex", justifyContent: "center",}}>
          <TextField
            value={leaderboardTitle}
            onChange={updateTitle}
            label="Leaderboard Title"
            style={{
              width: "80%",
              margin: "20px 0"
            }}
          ></TextField>
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: 30, flexWrap: "wrap"}}>
          <div style={{width: "40%", minWidth: 200, textAlign: "center"}}>
            <InputLabel id="label">Competition Units</InputLabel>
            <NativeSelect
                labelId="label"
                value = {modifierType}
                onChange = {handleModifierTypeChange}
                style = {{
                  marginRight: 10
                }}
            >
                {Object.keys(units).map((type) => (
                    <option value={type.toLowerCase()}>{type}</option>
                ))}
            </NativeSelect>

            {/* don't render a second list unless there are unit options */}
            {generateUnitSelect()}
          </div>
          <div style={{flexBasis: "100%", height: 0}}></div>
          <div style={{width: "40%", minWidth: 200, textAlign: "center", marginTop: 40}}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Success Metric</FormLabel>
              <RadioGroup value={rankOrder} onChange={handleRankOrder}>
                <FormControlLabel value="high" control={<Radio />} label="Highest Entry" />
                <FormControlLabel value="low" control={<Radio />} label="Lowest Entry" />
              </RadioGroup>
            </FormControl>
          </div>
        </div>

        <div style={{textAlign:"center", margin:"30px 0 10px 0"}}>
          <Button variant="contained" color="primary" onClick={sendLeaderboardJSON}>
            Create Leaderboard
          </Button>
        </div>
      </div>
  );

  return (

    <div style={{ textAlign: "center"}}>
      <AddCircleIcon style={{ fontSize: 40, color:"#41C3A7"}} onClick={handleOpen}></AddCircleIcon>
      <Modal
        open={open}
        onClose={handleClose}
      >
        {body}
      </Modal>
    </div>
  );
}