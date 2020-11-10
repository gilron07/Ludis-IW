import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Header from './Header.js';
import EditSection from './EditSection';

import TextField from "@material-ui/core/TextField"
import Button from "@material-ui/core/Button"
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';

import '../css/CreateWorkout.css'; 

const useStyles = makeStyles((theme) => ({
  tagsInput: {
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
}));      

let sectionIdGenerator = 0;
let drillIdGenerator = 0;

const CreateWorkout = () => {
  const classes = useStyles();

  // hooks
  const [workoutJSON, setWorkoutJSON] = useState(
    {
      "title": "",
      "created_at": "",
      "description": "",
      "tags": ["heo"],
      "sections": [],
      "owner": "Henry Herrington"
    }
  );

  const [hashtag, setHashtag] = useState("");
  const [numberOfHashtags, setNumberOfHashtags] = useState(0);
  const [arrayOfHashtags, addHashtag] = useState([]);

  // tag logic
  const handleDelete = (h) => () => {
    addHashtag((arrayOfHashtags) =>
      arrayOfHashtags.filter((hashtag) => hashtag !== h)
    )
    setNumberOfHashtags(numberOfHashtags - 1)
  }

  const handleHashtagChange = (event) => setHashtag(event.target.value)

  const newHashtag = () => {
    let newHashtag = hashtag.trim()
    if (newHashtag === "") return;
    if (arrayOfHashtags.includes(newHashtag)) return;
    if (numberOfHashtags < 5) {
      setNumberOfHashtags(numberOfHashtags + 1)
      addHashtag((arrayOfHashtags) => arrayOfHashtags.concat(newHashtag))
    } else {
      console.log("Too many hashtags")
    }
  }
  const Hashtags = arrayOfHashtags.map((h) => (
    <Chip label={h} onDelete={handleDelete(h)}/>
  ))

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
      "id" : sectionIdGenerator++,
      "name" : "Section Name",
      "order" : 0,
      "drills" : [{
        "id": drillIdGenerator++,
        "drill_name": "Drill Name",
        "order": 1,
        "modifiers": [
            {
                "modifier": "distance",
                "quantity": 600,
                "unit": "meters"
            },
            {
                "modifier": "time",
                "quantity": 4,
                "unit": "minutes"
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
    let targetId = e.currentTarget.dataset.id;
    if (typeof targetId !== "string") return;
    targetId = parseInt(targetId);

    // find index of section to be removed
    const removalRequirement = (section) => section["id"] == targetId;
    let removalIndex = (workoutJSON["sections"]).findIndex(removalRequirement);

    // clone array
    let newJSON = {...workoutJSON};
    newJSON["sections"].splice(removalIndex, 1);
    setWorkoutJSON(newJSON);
}

function renameSection(sectionId, newName) {
  // find index of section to be renamed
  const renameRequirement = (section) => section["id"] == sectionId;
  let renameIndex = (workoutJSON["sections"]).findIndex(renameRequirement);

  // clone array
  let newJSON = {...workoutJSON};
  newJSON["sections"][renameIndex]["name"] = newName;
  setWorkoutJSON(newJSON);
}

  // drill functions ---------------------------------------

  const addDrill = (e) => {
    let sectionId = e.currentTarget.getAttribute("sectionId");

    // find index of section to be added to
    const addDrillRequirement = (section) => section["id"] == sectionId;
    let sectionIndex = (workoutJSON["sections"]).findIndex(addDrillRequirement);

    console.log(sectionId);
    
    let newDrill = {
      "id": drillIdGenerator++,
      "drill_name": "Drill Name",
      "order": 1,
      "modifiers": []
    }

    // clone workout object
    let newJSON = {...workoutJSON};
    newJSON["sections"][sectionIndex]["drills"].push(newDrill);
    setWorkoutJSON(newJSON);
  };

  const deleteDrill = (e) => {
    let drillId = e.currentTarget.getAttribute("drillId");
    let sectionId = e.currentTarget.getAttribute("sectionId");

    // find index of section
    const relevantSection = (section) => section["id"] == sectionId;
    let sectionIndex = (workoutJSON["sections"]).findIndex(relevantSection);

    // find index of drill
    const relevantDrill = (drill) => drill["id"] == drillId;
    let drillIndex = (workoutJSON["sections"][sectionIndex]["drills"]).findIndex(relevantDrill);

    // clone array
    let newJSON = {...workoutJSON};
    newJSON["sections"][sectionIndex]["drills"].splice(drillIndex, 1);
    
    setWorkoutJSON(newJSON);
}

  function renameDrill(drillId, sectionId, newName) {
    // find index of section
    const relevantSection = (section) => section["id"] == sectionId;
    let sectionIndex = (workoutJSON["sections"]).findIndex(relevantSection);

    // find index of drill
    const relevantDrill = (drill) => drill["id"] == drillId;
    let drillIndex = (workoutJSON["sections"][sectionIndex]["drills"]).findIndex(relevantDrill);

    // clone array
    let newJSON = {...workoutJSON};
    newJSON["sections"][sectionIndex]["drills"][drillIndex]["drill_name"] = newName;
    setWorkoutJSON(newJSON);
  }

    // modifier functions ---------------------------------------

    function updateModifierQuantity(modifierName, drillId, sectionId, newQuantity) {
      // find index of section
      const relevantSection = (section) => section["id"] == sectionId;
      let sectionIndex = (workoutJSON["sections"]).findIndex(relevantSection);

      // find index of drill
      const relevantDrill = (drill) => drill["id"] == drillId;
      let drillIndex = (workoutJSON["sections"][sectionIndex]["drills"]).findIndex(relevantDrill);

      // find index of modifier
      const relevantModifier = (mod) => mod["modifier"] == modifierName;
      let modifierIndex = (workoutJSON["sections"][sectionIndex]["drills"][drillIndex]["modifiers"]).findIndex(relevantModifier);

      // clone array
      let newJSON = {...workoutJSON};
      newJSON["sections"][sectionIndex]["drills"][drillIndex]["modifiers"][modifierIndex]["quantity"] = newQuantity;
      setWorkoutJSON(newJSON);
    }

    function updateModifierUnit(modifierName, drillId, sectionId, newUnit) {
      // find index of section
      const relevantSection = (section) => section["id"] == sectionId;
      let sectionIndex = (workoutJSON["sections"]).findIndex(relevantSection);

      // find index of drill
      const relevantDrill = (drill) => drill["id"] == drillId;
      let drillIndex = (workoutJSON["sections"][sectionIndex]["drills"]).findIndex(relevantDrill);

      // find index of modifier
      const relevantModifier = (mod) => mod["modifier"] == modifierName;
      let modifierIndex = (workoutJSON["sections"][sectionIndex]["drills"][drillIndex]["modifiers"]).findIndex(relevantModifier);

      // clone array
      let newJSON = {...workoutJSON};
      newJSON["sections"][sectionIndex]["drills"][drillIndex]["modifiers"][modifierIndex]["unit"] = newUnit;
      setWorkoutJSON(newJSON);
    }

    // -------------------------------------------------- STILL HAVE TO FINISH THIS
    
    function formatJSON() {
      // include tag array, remove ids
      // let newJSON = {...workoutJSON};
      // console.log(newJSON["tags"]);
      // console.log(arrayOfHashtags);
      // newJSON["tags"] = ["hi"];
      // console.log(JSON.stringify(newJSON, null, 4));
      // setWorkoutJSON(newJSON);

      console.log(JSON.stringify(workoutJSON, null, 4));
    }


  return (
    <div>
        <Header />
         <h1>New Workout</h1>
            <div className="main-input-title">Workout Name<br></br>
              <Input placeholder="for example: Pre Meet" fullWidth onChange={updateWorkoutTitle}/>
            </div>
            <div className="main-input-title">Workout Description<br></br> 
              <Input placeholder="important things to remember" fullWidth onChange={updateWorkoutDescription}/>
            </div>
            <div className="main-input-title">Tags<br></br> 
            </div>
            <TextField
               className={classes.tagsInput}
               size="small"
               rows={1}
               placeholder="for example: Technical"
               variant="outlined"
               value={hashtag}
               onChange={handleHashtagChange}
            />
            <Button color="secondary" onClick={newHashtag} className={classes.createTagButton}> Add Tag </Button>
            <div id="tags-container">
               {numberOfHashtags > 0 ? Hashtags : ""}
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

                updateModifierQuantity = {updateModifierQuantity}
                updateModifierUnit = {updateModifierUnit}

                key = {`section${section["id"]}`}
              ></EditSection>
            ))}

      <Button className={classes.button} onClick={addSection}>New Section</Button>
         
      <div className = {classes.createWorkoutContainer}>
        <Button color="secondary" className={classes.createWorkoutButton} onClick={formatJSON}> Create Workout </Button>
        <br></br><pre>{JSON.stringify(workoutJSON, null, 4)}</pre>
      </div>
    </div>
  )
}
 
export default CreateWorkout;