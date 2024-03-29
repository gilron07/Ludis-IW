import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import EditModifier from './EditModifier.js';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

// list imports
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

 
const useStyles = makeStyles((theme) => ({
    drillHeader: {
        fontSize: 10,
        boxShadow: "0 2px 4px #00000044",
        borderRadius: "20px",
        height: "30px",
        display: "flex",
        alignItems: "center",
    },
    drill: {
        width: "90%",
        margin: "auto",
    },
    deleteDrill: {
        zIndex: "4",
    },
    closeDrillIcon: {
        pointerEvents: "none",
        fontSize: "20px",
        color: "#00000077",
        textAlign: "right",
        paddingTop: "3px",
    },
    editSectionIcon: {
        pointerEvents: "none",
        fontSize: "17px",
        color: "#00000044",
        textAlign: "right"
    },
    button: {
        boxShadow: "0 2px 4px #00000044",
        marginTop: "5px"
    },
    drillTitleInput: {
        width: "calc(100% - 60px)",
    },
    drillSectionTitle: {
        padding: 0,
        marginTop: "20px",
        fontWeight: 800,
        height: 10,
    },
    drillButtonsContainer : {
        width: 60,
    },
    drillSecondaryAction: {
        width: "calc(100% - 32px)",
        display: "flex",
        alignItems: "center",
    }
}));    

function toCapitalize(string) {
    let newString = string.charAt(0).toUpperCase() + string.slice(1);
    newString = newString.replace(/_/g, " ");
    return newString
}

function EditDrill(props) {

    const classes = useStyles();

    const [open, setOpen] = React.useState(true);
    const [editTitle, setEditTitle] = React.useState(false);
    const [titleInput, setTitleInput] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const falseMods = ["distance", "weight", "time", "intensity", "reps", "sets", "rest_between_reps", "rest_between_sets"];

    const handleClick = () => {
      setOpen(!open);
    };

    const toggleEditTitle = () => {
        setEditTitle(!editTitle);
    }

    const handleInputChange = (e) => {
        console.log(titleInput);
        setTitleInput(e.target.value);
    }

    function confirmInputChange() {
        props.renameDrill(props.drillId, props.sectionId, titleInput)
        toggleEditTitle();
    }

    const handleButtonClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const addModifier = (event) => {
        let modifierName = event.target.dataset.mod;
        props.addModifier(modifierName, props.drillId, props.sectionId);
        handleButtonClose();
    }

    const deleteModifier = (event) => {
        let modifierName = event.target.dataset.mod;
        props.deleteModifier(modifierName, props.drillId, props.sectionId);
    }

    const handleButtonClose = () => {
        setAnchorEl(null);
    };

    function falseModifiers() {
        for (let i = 0; i < props.modifiers.length; i++) {
            let existingMod = props.modifiers[i]["modifier"];
            if (falseMods.includes(existingMod)){
                let removalIndex = falseMods.indexOf(existingMod);
                falseMods.splice(removalIndex, 1);
            }
        }
        return falseMods;
    }

    const generateSectionHeader = () =>{
        if (!editTitle) {
            return (
                <ListItem button onClick={handleClick} className={classes.drillHeader}>
                    <ListItemText primary={props.name}/>
                    <ListItemSecondaryAction>
                        <IconButton size="small" onClick={toggleEditTitle} sectionId={props.sectionId} drillId={props.drillId}>
                            <EditIcon className={classes.noPointerEvents} />
                        </IconButton>
                        <IconButton size="small" onClick={props.deleteDrill} sectionId={props.sectionId} drillId={props.drillId}>
                            <CloseIcon className={classes.noPointerEvents}/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            );
        }
        else return (
            <ListItem button onClick={handleClick} className={classes.drillHeader}>
                <ListItemSecondaryAction className={classes.drillSecondaryAction}>
                <div className={classes.drillTitleInput}>
                    <TextField
                        onChange={handleInputChange}
                        defaultValue={props.name}
                        fullWidth
                    >
                    </TextField>
                </div>
                <div className={classes.drillButtonsContainer}>
                    <IconButton size="small" onClick={confirmInputChange} sectionId={props.sectionId} drillId={props.drillId}>
                        <CheckCircleOutlineIcon className={classes.noPointerEvents} />
                    </IconButton>
                    <IconButton size="small" onClick={props.deleteDrill} sectionId={props.sectionId} drillId={props.drillId}>
                        <CloseIcon className={classes.noPointerEvents}/>
                    </IconButton>
                </div>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }

    return (
        <List className={classes.drill}>
            {generateSectionHeader()}
            <Collapse in={open} timeout="auto">
                <List component="div" disablePadding>
                <ListItem className="drill-section-title">
                    Modifiers
                </ListItem>
                {/* Modifiers */}
               
                {props.modifiers.map((modifier) => (
                    <ListItem key={modifier["modifier"]}>
                        <EditModifier
                            sectionId = {props.sectionId}
                            drillId = {props.drillId}
                            modifier = {modifier}

                            updateModifierQuantity = {props.updateModifierQuantity}
                            updateModifierUnit = {props.updateModifierUnit}
                        ></EditModifier>
                        <ListItemText className={classes.closeIconContainer}>
                            <MenuItem onClick={deleteModifier} data-mod={modifier["modifier"]}>
                                &#x2715;
                            </MenuItem>
                        </ListItemText>
                    </ListItem>
                ))}
                

                <ListItem>
                    {(props.modifiers.length < falseMods.length)
                    ? <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleButtonClick} className={classes.button}>
                        Add Modifier
                    </Button>
                    : null
                    }
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleButtonClose}
                    >
                        {
                            falseModifiers().map((modifierTitle) => (
                                <MenuItem
                                    key={modifierTitle}
                                    onClick={addModifier}
                                    data-mod={modifierTitle}
                                    data-section-id = {props.sectionId}
                                    data-drill-id = {props.drillId}
                                >
                                {toCapitalize(modifierTitle)}</MenuItem>
                            ))
                        }
                    </Menu>
                </ListItem>
                </List>
            </Collapse>
        </List>
    );
}
 
export default EditDrill;