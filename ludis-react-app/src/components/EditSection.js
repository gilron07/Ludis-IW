import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import EditDrill from './EditDrill.js';

// MUI component imports
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import TextField from "@material-ui/core/TextField"

// icons
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';


import '../css/CreateWorkout.css';

const useStyles = makeStyles((theme) => ({
    sectionHeader: {
        fontSize: 10,
        backgroundColor:"#41C3A7",
        color: "white",
        boxShadow: "0 2px 4px #00000044",
        borderRadius: "20px",
        height: "40px",
        '&:hover': {
            backgroundColor: "#7adec7",
        }
    },
    button: {
        boxShadow: "0 2px 4px #00000044",
        marginTop: "5px"
    },
    addDrillButtonContainer: {
        width: "90%",
        margin: "auto",
    },
    smoothSpacer: {
        height: "10px",
    },
    noPointerEvents: {
        pointerEvents: "none"
    },
    sectionTitleInput: {
        color: "white",
    },
    secondaryAction: {
        // width: "calc(100% - 30px)",
    }
})); 

let idGenerator = 0;

function EditSection(props) {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [editTitle, setEditTitle] = React.useState(false);
    const [titleInput, setTitleInput] = React.useState(false);
    const [sectionTitle, setSectionTitle] = React.useState("Workout Section");
    const [drillIds, setDrills] = React.useState([]);

    const handleClick = () => {
      setOpen(!open);
    };

    const toggleEditTitle = () => {
        setEditTitle(!editTitle);
    }

    const addDrill = () => {
        // clone array
        const newDrills = [...drillIds];
        newDrills.push(idGenerator++);
        setDrills(newDrills);
    };

    const deleteDrill = (event) => {
        let id = event.currentTarget.dataset.id;
        console.log(id);
        if (typeof id !== "string") return;
        let drillId = parseInt(id);

        // clone array
        let removalIndex = drillIds.indexOf(drillId);
        setDrills(drillIds.splice(removalIndex, 1));
        const newDrills = [...drillIds];
        console.log(newDrills);
        setDrills(newDrills);
    }

    const handleInputChange = (e) => {
        console.log(titleInput);
        setTitleInput(e.target.value);
    }

    function confirmInputChange() {
        setSectionTitle(titleInput);
        toggleEditTitle();
        console.log(sectionTitle);
    }

    const generateSectionHeader = () =>{
        if (!editTitle) {
            return (
                <ListItem button onClick={handleClick} className={classes.sectionHeader}>
                    <ListItemText primary={sectionTitle}/>
                    <ListItemSecondaryAction className={classes.secondaryAction}>
                        <IconButton size="small" onClick={toggleEditTitle} data-id={props.id}>
                            <EditIcon className={classes.noPointerEvents} />
                        </IconButton>
                        <IconButton size="small" onClick={props.deleteFunction} data-id={props.id}>
                            <CloseIcon className={classes.noPointerEvents}/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            );
        }
        else return (
            <ListItem button onClick={handleClick} className={classes.sectionHeader}>
                <ListItemSecondaryAction className={classes.secondaryAction}>
                    <TextField
                        InputProps={{className: classes.sectionTitleInput}}
                        onChange={handleInputChange}
                        placeholder={sectionTitle}
                    >
                    </TextField>
                    <IconButton size="small" onClick={confirmInputChange} data-id={props.id}>
                        <CheckCircleOutlineIcon className={classes.noPointerEvents} />
                    </IconButton>
                    <IconButton size="small" onClick={props.deleteFunction} data-id={props.id}>
                        <CloseIcon className={classes.noPointerEvents}/>
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }


    return (
        <List>
            {generateSectionHeader()}
            {/* MUI animations don't work if you alert margins/padding of Collpase menu, so we're using a spacer div */}
            <div className={classes.smoothSpacer}></div>
            <Collapse in={open} timeout="auto" unmountOnExit>
                {drillIds.map((id) => (
                    <EditDrill deleteFunction={deleteDrill} key={id} id={id}></EditDrill>
                ))}
                <div className={classes.addDrillButtonContainer}>
                    <Button className={classes.button} onClick={addDrill}>New Drill </Button>
                </div>
            </Collapse>
        </List>
    );
}
 
export default EditSection;