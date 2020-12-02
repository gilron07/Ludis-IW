import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputLabel from '@material-ui/core/InputLabel';
import axiosAPI from '../services/authAxios'

// radio buttons
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

// icons
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CircularProgress from "@material-ui/core/CircularProgress";
import {green} from "@material-ui/core/colors";

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
  },
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  buttonProgress: {
    color: "primary",
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  }
}));

export default function LeaderboardModal(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [leaderboardTitle, setLeaderboardTitle] = useState("");
  const [modifierType, setModifierType] = useState("weight");
  const [modifierUnit, setModifierUnit] = useState("lb");
  const [rankOrder, setRankOrder] = React.useState("high");

  const units = {
    "weight": ["lb", "kg"],
    "time": ["hours", "minutes", "seconds"],
    "distance": ["miles", "kilometers", "meters", "laps"],
    "sets": null,
    "reps": null,
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
    const modifier = e.target.value
    setModifierType(modifier);
    if (units[modifier] !== null) {
      setModifierUnit(units[modifier][0]);
    }
    else if (units[modifier] === null) setModifierUnit("null");
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

  function createChallenge(){
    const data = leaderboardJSON();
    setLoading(true);
    axiosAPI.post('/challenge/', data)
        .then((res)=>{
          axiosAPI.get('/challenge/')
              .then((res) =>{
                props.setLeaderboardData(res.data);
                setLoading(false);
                handleClose();
              })
        })
        .catch((err)=>{
          setLoading(false);
          console.log(err);
        });
  }

  function leaderboardJSON() {
    const leaderboardJSON = {
      "title" : leaderboardTitle,
      "modifier" : modifierType,
      "unit" : modifierUnit,
      "ascended_modifier" : rankOrder === "high"
    }

    console.log(JSON.stringify(leaderboardJSON));
    return leaderboardJSON;
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

        <div className={classes.wrapper} style={{textAlign:"center", margin:"30px 0 10px 0"}}>
          <Button disabled={loading} variant="contained" color="primary" onClick={createChallenge}>
            Create Leaderboard
          </Button>
          {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
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
