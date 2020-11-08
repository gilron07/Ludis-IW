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

let idGenerator = 0;

const CreateWorkout = () => {
  const classes = useStyles();
  const [hashtag, setHashtag] = useState("");
  const [numberOfHashtags, setNumberOfHashtags] = useState(0);
  const [arrayOfHashtags, addHashtag] = useState([]);
  const [sectionIds, setSections] = useState([]);


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

  //section logic 
  const addSection = () => {
    // clone array
    const newSections = [...sectionIds];
    newSections.push(idGenerator++);
    setSections(newSections);
};

const deleteSection = (event) => {
    let id = event.currentTarget.dataset.id;
    console.log(id);
    if (typeof id !== "string") return;
    let sectionId = parseInt(id);

    // clone array
    let removalIndex = sectionIds.indexOf(sectionId);
    setSections(sectionIds.splice(removalIndex, 1));
    const newSections = [...sectionIds];
    console.log(newSections);
    setSections(newSections);
}

  return (
    <div>
        <Header />
         <h1>New Workout</h1>
            <div className="main-input-title">Workout Name<br></br>
            <Input placeholder="for example: Pre Meet" fullWidth />
            </div>
            <div className="main-input-title">Workout Description<br></br> 
            <Input placeholder="important things to remember" fullWidth />
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

            {sectionIds.map((id) => (
              <EditSection deleteFunction={deleteSection} key={id} id={id}></EditSection>
            ))}

      <Button className={classes.button} onClick={addSection}>New Section</Button>
         
      <div className = {classes.createWorkoutContainer}>
        <Button color="secondary" onClick={newHashtag} className={classes.createWorkoutButton}> Create Workout </Button>
      </div>
    </div>
  )
}
 
export default CreateWorkout;