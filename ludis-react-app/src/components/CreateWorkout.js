import React from 'react';
import Header from './Header.js';

import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import NativeSelect from '@material-ui/core/NativeSelect';

// list imports
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import '../css/CreateWorkout.css';
 

const CreateWorkout = () => {

   const [age, setAge] = React.useState('');

   const [open, setOpen] = React.useState(true);
   const handleClick = () => {
      setOpen(!open);
    };
  

    return (
       <div>
          <Header />
         <h1>New Workout</h1>
         <form>
            <div class="main-input-title">Workout Name<br></br>
            <Input placeholder="for example: Pre Meet" fullWidth />
            </div>
            <div class="main-input-title">Workout Description<br></br> 
            <Input placeholder="important things to remember" fullWidth />
            </div>
            <div class="main-input-title">Tags<br></br> 
            <Input placeholder="for example: technical" inputProps={{ }} />
            <div id="tags-container">
               <Chip label="Technical" onDelete/>
               <Chip label="Low Intensity" onDelete/>
               <Chip label="Full Team" onDelete/>
            </div>
            </div>
         </form>
         

   <List>
      <div className="drill-header">
      <ListItem button onClick={handleClick} >
        <ListItemText primary="Warm Up"/>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      </div>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
         <ListItem className="drill-section-title">
            Modifiers
         </ListItem>
         <ListItem className="list-item">
            <TextField type="number" label="Weight" className="modifier-input" />
            <div className="modifier-input">
            <InputLabel>Unit</InputLabel>
            <NativeSelect>
               <option value={10}>lb</option>
               <option value={20}>kg</option>
            </NativeSelect>
            </div>
         </ListItem>
         <ListItem className="drill-section-title">
            Repetition
         </ListItem>
         <ListItem className="list-item">
         <TextField type="number" label="Reps" className="modifier-input"/>
            <div className="repetition-input">
            <TextField type="number" label="Sets" className="modifier-input" />
         </div>
         </ListItem>
            
         {/* <InputLabel id="label">Age</InputLabel>
         <Select labelId="label" id="select">
            <MenuItem value="10">Ten</MenuItem>
            <MenuItem value="20">Twenty</MenuItem>
         </Select> */}
         
        </List>
      </Collapse>
    </List>

       </div>
    );
}
 
export default CreateWorkout;