import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import EditDrill from './EditDrill.js';

// list imports
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import '../css/CreateWorkout.css';

const useStyles = makeStyles((theme) => ({
    sectionHeader: {
        fontSize: 10,
        backgroundColor:"#41C3A7",
        color: "white",
        boxShadow: "0 2px 4px #00000044",
        borderRadius: "20px",
        height: "40px"
    },
    button: {
        boxShadow: "0 2px 4px #00000044",
        marginTop: "15px"
    }
}));   

const EditSection = () => {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [drillCount, setDrills] = React.useState([]);

    const handleClick = () => {
      setOpen(!open);
    };

    const addDrill = () => {
        // clone array
        const newDrills = [...drillCount];
        newDrills.push("x");
        setDrills(newDrills);
    };

    return (
        <List>
            <ListItem button onClick={handleClick} className={classes.sectionHeader}>
                <ListItemText primary="Section Title"/>
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                {drillCount.map((index) => (
                    <div>
                        <EditDrill></EditDrill>
                    </div>
                ))}
                <Button className={classes.button} onClick={addDrill}> Add Drill </Button>
            </Collapse>
        </List>
    );
}
 
export default EditSection;