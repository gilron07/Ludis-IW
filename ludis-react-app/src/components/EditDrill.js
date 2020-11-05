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

// icons
import CloseIcon from '@material-ui/icons/Close';
 
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
    closeIcon: {
        fontSize: "20px",
        color: "#00000077",
        textAlign: "right"
    },
    closeIconContainer: {
        textAlign: "right"
    }
}));    

function toCapitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const EditDrill = () => {

    const classes = useStyles();

    const [open, setOpen] = React.useState(false);
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

    return (
        <List className={classes.drill}>
            <ListItem button onClick={handleClick} className={classes.drillHeader}>
                <ListItemText primary="Drill Title"/>
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
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
                    <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleButtonClick}>
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
                            falseModifiers().map((key) => (
                                <MenuItem onClick={addModifier} data-mod={key}>{toCapitalize(key)}</MenuItem>
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