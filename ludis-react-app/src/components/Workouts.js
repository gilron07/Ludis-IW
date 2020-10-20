import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';

// list imports
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import '../css/Workouts.css';
 
const Workouts = () => {

   const [open, setOpen] = React.useState(true);
   const handleClick = () => {
      setOpen(!open);
    };
  

    return (
       <div>
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
         
   <List className="drill-header">
      <ListItem button onClick={handleClick} >
        <ListItemText primary="Inbox"/>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button>
            <ListItemText primary="Starred" />
            <InputLabel id="label">Age</InputLabel>
         <Select labelId="label" id="select">
            <MenuItem value="10">Ten</MenuItem>
            <MenuItem value="20">Twenty</MenuItem>
         </Select>
         <InputLabel id="label">Age</InputLabel>
         <Select labelId="label" id="select">
            <MenuItem value="10">Ten</MenuItem>
            <MenuItem value="20">Twenty</MenuItem>
         </Select>
          </ListItem>
        </List>
      </Collapse>
    </List>

       </div>
    );
}
 
export default Workouts;