import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import CircularProgress from '@material-ui/core/CircularProgress';

import Header from './Header.js';
import EditSection from './EditSection';

import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';
import axiosAPI from '../services/authAxios'

const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    position: 'relative',
  },
  createTagButton: {
    border: "1px solid #BBB",
    marginLeft: "10px"
  },
  createWorkoutButton: {
    border: "1px solid #BBB",
  },
  createWorkoutContainer: {
    marginTop: "50px",
    textAlign: "center"
  },
  button: {
    boxShadow: "0 2px 4px #00000044",
    marginTop: "5px"
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
  mainInputTitle: {
    color: "#41C3A7",
    fontWeight: 600,
    fontSize: "20px",
    marginBottom: 20
  }
}));      

let sectionIdGenerator = 0;
let drillIdGenerator = 0;

const CreateWorkout = (props) => {
  const classes = useStyles();
  const history = useHistory();

  // hooks
  const [workoutJSON, setWorkoutJSON] = useState(
    (typeof props.location.workout === "undefined")
      ? 
        {
          "title": "My Workout",
          "created_at": "",
          "description": "",
          "tags": [],
          "sections": [
            {
              "id": sectionIdGenerator,
              "name": "Section Title",
              "order": sectionIdGenerator++,
              "drills": [
                  {
                      "id": drillIdGenerator,
                      "drill_name": "Drill Title",
                      "created_at": "2020-10-31T15:59:20.246136Z",
                      "order": drillIdGenerator++,
                      "modifiers": []
                  }
              ]
          }
          ]
        }
      : props.location.workout
  );

  const [hashtag, setHashtag] = useState("");
  const [loading, setLoading] = useState(false);

  // tag functions ---------------------------------------

  const handleDelete = (removalTag) => () => {
    // // clone workout object
    const newTags = workoutJSON["tags"].filter((tag) => tag !== removalTag)
    let newJSON = {...workoutJSON};
    newJSON["tags"] = newTags;
    setWorkoutJSON(newJSON);
  }

  const handleHashtagChange = (event) => setHashtag(event.target.value)

  const newHashtag = () => {
    let newHashtag = hashtag.trim()
    if (newHashtag === "") return;
    if (workoutJSON["tags"].some(e => e.name === newHashtag)) return;
    newHashtag = {name: newHashtag}
    if (workoutJSON["tags"].length < 5) {
      // clone workout object
      let newJSON = {...workoutJSON};
      newJSON["tags"] = workoutJSON["tags"].concat(newHashtag);
      setWorkoutJSON(newJSON);
      setHashtag("");
    } else {
      console.log("Too many hashtags")
    }
  }

  const Hashtags = workoutJSON["tags"].map((tag) => (
    <Chip label={tag.name} onDelete={handleDelete(tag)} style={{margin: "10px 5px 0 0"}}/>
  ))

  // general functions ---------------------------------------

  const updateWorkoutTitle = (e) => {
    const newTitle = e.target.value;
    let newJSON = {...workoutJSON};
    newJSON["title"] = newTitle;
    setWorkoutJSON(newJSON);
  }
  
  const updateWorkoutDescription = (e) => {
    const newDescription = e.target.value;
    let newJSON = {...workoutJSON};
    newJSON["description"] = newDescription;
    setWorkoutJSON(newJSON);
  }

  // section functions ---------------------------------------

  const addSection = () => {
    let newSection = {
      "id" : sectionIdGenerator,
      "name" : "Section Name",
      "order" : sectionIdGenerator++,
      "drills" : [{
        "id": drillIdGenerator,
        "drill_name": "Drill Name",
        "order": drillIdGenerator++,
        "modifiers": [
            {
                "modifier": "distance",
                "quantity": null,
                "unit": "meters"
            }
        ]
    }]
    }

    // clone workout object
    let newJSON = {...workoutJSON};
    newJSON["sections"].push(newSection);
    setWorkoutJSON(newJSON);
};

const deleteSection = (e) => {
  let sectionId = e.currentTarget.dataset.id;
  if (typeof sectionId !== "string") return;
  sectionId = parseInt(sectionId);

  let sectionIndex = findSectionIndex(sectionId);

  // clone array
  let newJSON = {...workoutJSON};
  newJSON["sections"].splice(sectionIndex, 1);
  setWorkoutJSON(newJSON);
}

function renameSection(sectionId, newName) {
  if (!newName) return;
  if (newName.trim() === "") return;
  let sectionIndex = findSectionIndex(sectionId);

  // clone array
  let newJSON = {...workoutJSON};
  newJSON["sections"][sectionIndex]["name"] = newName;
  setWorkoutJSON(newJSON);
}

  // drill functions ---------------------------------------

  const addDrill = (e) => {
    let sectionId = e.currentTarget.getAttribute("sectionId");

    let sectionIndex = findSectionIndex(sectionId);

    console.log(sectionId);
    
    let newDrill = {
      "id": drillIdGenerator,
      "drill_name": "Drill Name",
      "order": drillIdGenerator++,
      "modifiers": []
    }

    // clone workout object
    let newJSON = {...workoutJSON};
    newJSON["sections"][sectionIndex]["drills"].push(newDrill);
    setWorkoutJSON(newJSON);
  };

  const deleteDrill = (e) => {
    console.log(e.currentTarget)
    let drillId = e.currentTarget.getAttribute("drillId");
    let sectionId = e.currentTarget.getAttribute("sectionId");

    let sectionIndex = findSectionIndex(sectionId);
    let drillIndex = findDrillIndex(drillId, sectionIndex);

    // clone array
    let newJSON = {...workoutJSON};
    newJSON["sections"][sectionIndex]["drills"].splice(drillIndex, 1);
    
    setWorkoutJSON(newJSON);
}

  function renameDrill(drillId, sectionId, newName) {
    if (!newName) return;
    if (newName.trim() === "") return;

    let sectionIndex = findSectionIndex(sectionId);
    let drillIndex = findDrillIndex(drillId, sectionIndex);

    // clone array
    let newJSON = {...workoutJSON};
    newJSON["sections"][sectionIndex]["drills"][drillIndex]["drill_name"] = newName;
    setWorkoutJSON(newJSON);
  }

    // modifier functions ---------------------------------------

    function addModifier(modifierName, drillId, sectionId) {
      let sectionIndex = findSectionIndex(sectionId);
      let drillIndex = findDrillIndex(drillId, sectionIndex);

      const units = {
        "weight": ["lb", "kg"],
        "time": ["hours", "minutes", "seconds"],
        "distance": ["miles", "kilometers", "meters", "laps"],
        "intensity": [null],
        "sets": [null],
        "reps": [null],
        "rest_between_reps": ["minutes", "seconds"],
        "rest_between_sets": ["minutes", "seconds"],
    }

      let newModifier = {
        "modifier": modifierName,
        "quantity": null,
        "unit": units[modifierName][0]
      }
  
      // clone workout object
      let newJSON = {...workoutJSON};
      newJSON["sections"][sectionIndex]["drills"][drillIndex]["modifiers"].push(newModifier);
      setWorkoutJSON(newJSON);
    };

    function deleteModifier(modifierName, drillId, sectionId) {
      let sectionIndex = findSectionIndex(sectionId);
      let drillIndex = findDrillIndex(drillId, sectionIndex);
      let modifierIndex = findModfierIndex(modifierName, drillIndex, sectionIndex)

      // clone workout object
      let newJSON = JSON.parse(JSON.stringify(workoutJSON));
      newJSON["sections"][sectionIndex]["drills"][drillIndex]["modifiers"].splice(modifierIndex, 1);
      console.log(newJSON);
      setWorkoutJSON(newJSON);
    };

    function updateModifierQuantity(modifierName, drillId, sectionId, newQuantity) {
      let sectionIndex = findSectionIndex(sectionId);
      let drillIndex = findDrillIndex(drillId, sectionIndex);
      let modifierIndex = findModfierIndex(modifierName, drillIndex, sectionIndex)
      
      // clone array
      let newJSON = {...workoutJSON};
      newJSON["sections"][sectionIndex]["drills"][drillIndex]["modifiers"][modifierIndex]["quantity"] = newQuantity;
      setWorkoutJSON(newJSON);
    }

    function updateModifierUnit(modifierName, drillId, sectionId, newUnit) {
      let sectionIndex = findSectionIndex(sectionId);
      let drillIndex = findDrillIndex(drillId, sectionIndex);
      let modifierIndex = findModfierIndex(modifierName, drillIndex, sectionIndex)

      // clone array
      let newJSON = {...workoutJSON};
      newJSON["sections"][sectionIndex]["drills"][drillIndex]["modifiers"][modifierIndex]["unit"] = newUnit;
      setWorkoutJSON(newJSON);
    }

    // --------------------------------------------------

    // find index of section within the workout
    function findSectionIndex(sectionId) {
      const relevantSection = (section) => section["id"] === sectionId;
      return(workoutJSON["sections"]).findIndex(relevantSection);
    }

    // find index of section within a section
    function findDrillIndex(drillId, sectionIndex) {
      const relevantDrill = (drill) => drill["id"] === drillId;
      return(workoutJSON["sections"][sectionIndex]["drills"]).findIndex(relevantDrill);
    }

    // find index of modifier within a drill
    function findModfierIndex(modifierName, drillIndex, sectionIndex) {
      const relevantModifier = (mod) => mod["modifier"] === modifierName;
      return(workoutJSON["sections"][sectionIndex]["drills"][drillIndex]["modifiers"]).findIndex(relevantModifier);
    }
    
    function createWorkout() {
      const data = formatJSON();
      setLoading(true);
      axiosAPI.post('/workouts/', data)
          .then((res)=>{
            console.log(res)
            setLoading(false);
            history.push('/workouts', {created:true})
          })
          .catch((err)=>{
              setLoading(false);
              console.log(err)
          });
    }

    // for future versions of Ludis
    function updateWorkout() {
      return null;
    }

    function formatJSON() {
      let outputJSON = JSON.parse(JSON.stringify(workoutJSON));
      // outputJSON = deleteEmptyModifiers(outputJSON);

      // delete all ids
      outputJSON["sections"].map((section) => (
        delete section["id"],
        section["drills"].map((drill) => (
          delete drill["id"]
        ))
      ));

      // add date (date code taken from online)
      var dateObj = new Date();
      var month = dateObj.getUTCMonth() + 1; //months from 1-12
      var day = dateObj.getUTCDate();
      var year = dateObj.getUTCFullYear();

      let newDate = year + "-" + month + "-" + day;
      outputJSON["created_at"] = newDate
      console.log(JSON.stringify(outputJSON, null, 4));
      return outputJSON
    }


  return (
    <div>
        <Header />
         <h1>New Workout</h1>
            <div className={classes.mainInputTitle}>Workout Name<br></br>
              <TextField
                fullWidth
                onChange={updateWorkoutTitle}
                error = {workoutJSON["title"].trim() === ""}
                helperText = {(workoutJSON["title"].trim() === "") ? "Workout Name cannot be blank" : null}
                value = {workoutJSON["title"]}
              />
            </div>
            <div className={classes.mainInputTitle}>Workout Description<br></br> 
              <TextField
                fullWidth
                onChange={updateWorkoutDescription}
                inputProps={{maxLength: 1000}}
              />
            </div>
            <div className={classes.mainInputTitle} style={{marginBottom: 5}}>Tags</div>
            <div style={{marginBottom: 20}}>
              <TextField
                size="small"
                rows={1}
                placeholder="for example: Technical"
                variant="outlined"
                value={hashtag}
                onChange={handleHashtagChange}
              />
              <Button color="secondary" onClick={newHashtag} className={classes.createTagButton}> Add Tag </Button>
              <div style={{display: "inline-block", marginLeft: "2vw"}}>
                {workoutJSON["tags"].length > 0 ? Hashtags : ""}
              </div>
            </div>

            {workoutJSON["sections"].map((section) => (
              <EditSection
                sectionId = {section["id"]}
                name = {section["name"]}
                drills = {section["drills"]}

                deleteSection = {deleteSection}
                renameSection = {renameSection}
                addDrill = {addDrill}
                renameDrill = {renameDrill}
                deleteDrill = {deleteDrill}

                addModifier = {addModifier}
                deleteModifier = {deleteModifier}
                updateModifierQuantity = {updateModifierQuantity}
                updateModifierUnit = {updateModifierUnit}

                key = {`section${section["id"]}`}
              ></EditSection>
            ))}

      <Button className={classes.button} onClick={addSection}>New Section</Button>
         
      <div className = {classes.createWorkoutContainer}>
        {(typeof props.location.workout === "undefined")
          ? <div className={classes.wrapper}>
            <Button
              color="secondary"
              className={classes.createWorkoutButton}
              onClick={createWorkout}
              disabled = {loading || workoutJSON["title"].trim() === ""}
            >Create Workout</Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
            </div>
          : <Button
              color="secondary"
              className={classes.createWorkoutButton}
              onClick={updateWorkout}
              disabled = {workoutJSON["title"].trim() === ""}
            >Update Workout</Button>
        }
        <br></br>
        {workoutJSON["title"].trim() === ""
          ? <p style={{color: "red"}}>Workout Name cannot be blank</p>
          : null
        }
      </div>

    </div>
  )
}
 
export default CreateWorkout;