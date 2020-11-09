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
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
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
        height: "30px"
    },
    drill: {
        width: "90%",
        margin: "auto",
    },
    deleteDrill: {
        zIndex: "3",
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
    secondaryAction: {
        width: "calc(100% - 30px)",
        textAlign: "right",
    },
    drillTitleInput: {
        width: "calc(72vw - 92px)",
    },
}));    

function toCapitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function EditDrill(props) {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
    const [editTitle, setEditTitle] = React.useState(false);
    const [titleInput, setTitleInput] = React.useState(false);
    const [drillTitle, setDrillTitle] = React.useState("Drill Section");
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [openModifiers, setOpenModifiers] = React.useState({
        "weight": true,
        "time": false,
        "distance": false,
        "intensity": true
    });

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
        setDrillTitle(titleInput);
        toggleEditTitle();
        console.log(drillTitle);
    }

    const handleButtonClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const addModifier = (event) => {
        let mod = event.target.dataset.mod;
        // Cloning an object in JS, we can't alter the state directly
        const newModifiers = JSON.parse(JSON.stringify(openModifiers));
        newModifiers[mod] = true;
        setOpenModifiers(newModifiers);
        handleButtonClose();
    }

    const deleteModifier = (event) => {
        let mod = event.target.dataset.mod;
        console.log(mod);
        // Cloning an object in JS, we can't alter the state directly
        const newModifiers = JSON.parse(JSON.stringify(openModifiers));
        newModifiers[mod] = false;
        setOpenModifiers(newModifiers);
    }

    const handleButtonClose = () => {
        setAnchorEl(null);
    };

    function trueModifiers() {
        let trueMods = [];
        for (const key in openModifiers) {
            if (openModifiers[key]) {
                trueMods.push(key);
            }
        }
        return trueMods;
    }

    function falseModifiers() {
        let falseMods = [];
        for (const key in openModifiers) {
            if (!openModifiers[key]) {
                falseMods.push(key);
            }
        }
        return falseMods;
    }

    const generateSectionHeader = () =>{
        if (!editTitle) {
            return (
                <ListItem button onClick={handleClick} className={classes.drillHeader}>
                    <ListItemText primary={drillTitle}/>
                    <ListItemSecondaryAction>
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
            <ListItem button onClick={handleClick} className={classes.drillHeader}>
                <ListItemSecondaryAction className={classes.secondaryAction}>
                    <TextField
                        InputProps={{className: classes.drillTitleInput}}
                        onChange={handleInputChange}
                        placeholder={drillTitle}
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
        <List className={classes.drill}>
            {generateSectionHeader()}
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                <ListItem className="drill-section-title">
                    Modifiers
                </ListItem>
                {/* Modifiers */}
               
                {trueModifiers().map((key) => (
                    <ListItem>
                        <EditModifier type={key}></EditModifier>
                        <ListItemText className={classes.closeIconContainer}>
                            <MenuItem onClick={deleteModifier} data-mod={key}>
                                &#x2715;
                                {/* <CloseIcon className={classes.closeIcon}></CloseIcon> */}
                            </MenuItem>
                        </ListItemText>
                    </ListItem>
                ))}
                

                <ListItem>
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleButtonClick} className={classes.button}>
                        Add Modifier
                    </Button>
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleButtonClose}
                    >
                        {
                            falseModifiers().map((modifierTitle) => (
                                <MenuItem key={modifierTitle} onClick={addModifier} data-mod={modifierTitle}>{toCapitalize(modifierTitle)}</MenuItem>
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