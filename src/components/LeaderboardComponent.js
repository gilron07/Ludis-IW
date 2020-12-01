import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import LeaderboardReportModal from './LeaderboardReportModal';

// list imports
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';

// icons
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const useStyles = makeStyles((theme) => ({
    drillHeader: {
        color: "white",
        backgroundColor:"#41C3A7",
        borderRadius: 20,
        '&:hover': {
            backgroundColor: "#7adec7",
        },
    },
    headerTitle: {
        // backgroundColor: "purple",
        width: "70%",
        minWidth: 150,
    },
    avatar : {
        height: 30,
        width: 30,
    },
    nameCol : {
        width: "calc(70% - 100px)",
        minWidth: 150,
        whiteSpace: "nowrap",
        // backgroundColor: "pink"
    },
    dateCol : {
        [theme.breakpoints.down('xs')]: {
            display: "none",
        },
        width: "15%",
        textAlign: "center",
        marginRight: "15px",
        // backgroundColor: "red",
    },
    dateColLabel : {
        [theme.breakpoints.down('xs')]: {
            display: "none",
        },
        width: "15%",
        textAlign: "center",
        marginRight: "15px",
        // backgroundColor: "orange",
    },
    recordCol : {
        width: "15%",
        textAlign: "center",
        // backgroundColor: "yellow",
        [theme.breakpoints.down('xs')]: {
            width: "30%",
        },
    },
    recordColLabel : {
        width: "15%",
        textAlign: "center",
        // backgroundColor: "green",
        [theme.breakpoints.down('xs')]: {
            width: "30%",
        },
    }, 

}));

function generateAvatarColor(name) {

    const colors = [
        "#89a7d9",  // blue
        "#6e9c6d", // green
        "#b56757", // red
        "orange",
        "#756aab" // purple
    ]

    const firstInit = name[0].charCodeAt(0);
    let secondInit = 0;
    if (name.length > 1) {
        secondInit = name[1].charCodeAt(0);
    }
    const simpleHash = (firstInit + secondInit) % colors.length
    return colors[simpleHash];
}

function LeaderboardComponent(props) {
    const classes=useStyles();
    const [open, setOpen] = useState(true);
    const [newRecord, setNewRecord] = useState("");

    function handleClick() {
       setOpen(!open);
    }

    const medalColors = ["#ffe3b5", "#eee", "#eddaad"];

    function formatPlace(n) {
        let lastDigit = n % 10 + 1;
        let ordinal = "th";
        if (lastDigit === 1) ordinal = "st";
        else if (lastDigit === 2) ordinal = "nd";
        else if (lastDigit === 3) ordinal = "rd";

        // check if it's a "teen" number
        if ((n % 100) < 14 && (n % 100) > 10) ordinal = "th";

        return n + 1 + ordinal;
    }

    function formatDate(date) {
        const globalDate = new Date(date);
        return (globalDate.toLocaleString().split(",")[0]);
    }

    return(
        <List style={{marginBottom: 25}}>
            <ListItem button onClick={handleClick} className={classes.drillHeader}>
                <div className={classes.headerTitle}>{props.title}</div>
                <div className={classes.recordColLabel}>{props.unit}</div>
                <div className={classes.dateColLabel}>Date Set</div>
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {props.responses.map((record, index) => (
                        <ListItem style={{ position: "relative", overflow: "hidden", }} divider>
                            <div style={{backgroundColor: medalColors[index], height: "100%", width: "calc(100% - 30px)", position: "absolute", zIndex: -1}}></div>
                            <div style={{width: 60, textAlign: "center"}}>{formatPlace(index)}</div>
                            <div style={{width: 40, textAlign: "center"}}>
                                <Avatar className={classes.avatar} style={{ 
                                    backgroundColor: generateAvatarColor(
                                        record.user_name.split(" ")
                                    ),
                                    }}
                                >{
                                    // get initials
                                    record.user_name.split(" ").map((nameWord) => (nameWord[0]))
                                }</Avatar>
                            </div>
                            <div className={classes.nameCol}>{record.user_name}</div>
                            <div className={classes.recordCol}>{parseFloat(record.result)}</div>
                            <div className={classes.dateCol}>
                                {formatDate(record.date)}
                            </div>
                        </ListItem>
                    ))}
                </List>
                <LeaderboardReportModal
                    setLeaderboardData={props.setLeaderboardData}
                    unit = {props.unit}
                    id = {props.id}    
                ></LeaderboardReportModal>
            </Collapse>
        </List>
    )
}

export default LeaderboardComponent;