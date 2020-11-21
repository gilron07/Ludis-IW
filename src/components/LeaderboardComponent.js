import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';

// list imports
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    drillHeader: {
        color: "white",
        backgroundColor:"#41C3A7",
        borderRadius: 20,
        '&:hover': {
            backgroundColor: "#7adec7",
        }
    },
    avatar : {
        height: 30,
        width: 30,
    }
}));

const fakeData =
    {
        "metric" : "seconds",
        "records" : [
        {
            "name" : "Rob Fish",
            "date" : "2019-01-09T20:13:00.205946Z",
            "record" : 3.84
        },
        {
            "name" : "Usain Bolt",
            "date" : "2020-03-08T20:13:00.205946Z",
            "record" : 3.85
        },
        {
            "name" : "Henry Herrington",
            "date" : "2020-11-09T20:13:00.205946Z",
            "record" : 9.99
        },
        {
            "name" : "Gilron Tsabkevich",
            "date" : "2020-12-31T20:13:00.205946Z",
            "record" : 10.34
        }
        ]
    }

function LeaderboardComponent(props) {
    const classes=useStyles();
    const [open, setOpen] = useState(true);

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

    return(
        <List>
            <ListItem button onClick={handleClick} className={classes.drillHeader}>
            <ListItemText primary={props.title}/>
            {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {fakeData.records.map((record, index) => (
                        <ListItem style={{ position: "relative" }} divider>
                            <div style={{backgroundColor: medalColors[index], height: "100%", width: "calc(100% - 30px)", position: "absolute", zIndex: -1}}></div>
                            <div style={{width: 60, textAlign: "center"}}>{formatPlace(index)}</div>
                            <div style={{width: 50, textAlign: "center"}}>
                                <Avatar className={classes.avatar}>{
                                    // get initials
                                    record.name.split(" ").map((nameWord) => (nameWord[0]))
                                }</Avatar>
                            </div>
                            <ListItemText primary={record.name} style={{minWidth: 150, width: "50%", overflow: "hidden", whiteSpace: "nowrap"}}/>
                            <ListItemText primary={record.record} style={{width: "5%", textAlign: "center"}}/>
                            <ListItemText primary={record.date.split("T")[0]} style={{width: "5%", textAlign: "center"}}/>
                        </ListItem>
                    ))}
                </List>
            </Collapse>
        </List>
    )
}

// background: `linear-gradient(${medalColors[index]}, #00000000)`

export default LeaderboardComponent;