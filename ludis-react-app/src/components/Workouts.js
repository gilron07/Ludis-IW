import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
 
const Workouts = () => {
    return (
       <div>

         <h1>Workouts</h1>
         <p>Here are your workouts.</p>
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

       </div>
    );
}
 
export default Workouts;