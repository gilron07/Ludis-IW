import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

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
        width: "calc(80vw - 92px)",
    },
    secondaryAction: {
        width: "calc(100% - 30px)",
        textAlign: "right",
    }
})); 

function EditSection(props) {

    const classes = useStyles();

    const [open, setOpen] = React.useState(true);
    const [editTitle, setEditTitle] = React.useState(false);
    const [titleInput, setTitleInput] = React.useState(false);

    const handleClick = () => {
      setOpen(!open);
    };

    const toggleEditTitle = () => {
        setEditTitle(!editTitle);
    }

    const handleInputChange = (e) => {
        setTitleInput(e.target.value);
    }

    function confirmInputChange() {
        props.renameSection(props.sectionId, titleInput);
        toggleEditTitle();
    }

    const generateSectionHeader = () =>{
        if (!editTitle) {
            return (
                <ListItem button onClick={handleClick} className={classes.sectionHeader}>
                    <ListItemText primary={props.name}/>
                    <ListItemSecondaryAction >
                        <IconButton size="small" onClick={toggleEditTitle} data-id={props.sectionId}>
                            <EditIcon className={classes.noPointerEvents} />
                        </IconButton>
                        <IconButton size="small" onClick={props.deleteSection} data-id={props.sectionId}>
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
                        placeholder={props.name}
                    >
                    </TextField>
                    <IconButton size="small" onClick={confirmInputChange} data-id={props.sectionId}>
                        <CheckCircleOutlineIcon className={classes.noPointerEvents} />
                    </IconButton>
                    <IconButton size="small" onClick={props.deleteSection} data-id={props.sectionId}>
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
            <Collapse in={open} timeout="auto">
                {props.drills.map((drill) => (
                    <EditDrill
                        sectionId = {props.sectionId}
                        drillId = {drill["id"]}
                        name = {drill["drill_name"]}
                        modifiers = {drill["modifiers"]}

                        renameDrill = {props.renameDrill}
                        deleteDrill = {props.deleteDrill}

                        addModifier = {props.addModifier}
                        deleteModifier = {props.deleteModifier}
                        updateModifierQuantity = {props.updateModifierQuantity}
                        updateModifierUnit = {props.updateModifierUnit}

                        key = {`drill${drill["id"]}`}
                    ></EditDrill>
                ))}
                <div className={classes.addDrillButtonContainer}>
                    <Button className={classes.button} onClick={props.addDrill} sectionId={props.sectionId}>New Drill</Button>
                </div>
            </Collapse>
        </List>
    );
}
 
export default EditSection;