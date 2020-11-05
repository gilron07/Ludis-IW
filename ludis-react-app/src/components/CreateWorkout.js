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
  }
}));    

const CreateWorkout = () => {
  const classes = useStyles();
  const [hashtag, setHashtag] = useState("")
  const [numberOfHashtags, setNumberOfHashtags] = useState(0)
  const [arrayOfHashtags, addHashtag] = useState([])

  const handleDelete = (h) => () => {
    addHashtag((arrayOfHashtags) =>
      arrayOfHashtags.filter((hashtag) => hashtag !== h)
    )
    setNumberOfHashtags(numberOfHashtags - 1)
  }

  const handleHashtagChange = (event) => setHashtag(event.target.value)

  const newHashtag = () => {
    let newHashtag = hashtag.trim()
    if (newHashtag == "") return;
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
  console.log(arrayOfHashtags)
  return (
    <div>
        <Header />
         <h1>New Workout</h1>
            <div class="main-input-title">Workout Name<br></br>
            <Input placeholder="for example: Pre Meet" fullWidth />
            </div>
            <div class="main-input-title">Workout Description<br></br> 
            <Input placeholder="important things to remember" fullWidth />
            </div>
            <div class="main-input-title">Tags<br></br> 
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


         <EditSection></EditSection>
         <EditSection></EditSection>
         <EditSection></EditSection> 
         
      <div className = {classes.createWorkoutContainer}>
        <Button color="secondary" onClick={newHashtag} className={classes.createWorkoutButton}> Create Workout </Button>
      </div>
    </div>
  )
}
 
export default CreateWorkout;