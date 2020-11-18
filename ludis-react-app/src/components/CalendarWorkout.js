import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Chip from '@material-ui/core/Chip';

//icons
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

const useStyles = makeStyles((theme) => ({
    leftContainer: {
        width: "90%",
        minWidth: 250,
        overflow: "hidden",
        whiteSpace: "nowrap",
        display: "flex"
    },
    rightContainer: {
        width: "10%",
        minWidth: 60,
    },
    workoutTitle: {
        display: "inline-block",
        overflow: "hidden",
        whiteSpace: "nowrap",
    },
    workoutDate: {
        height: "58px",
        width: "58px",
        marginRight: "20px",
        display: "inline-block",
    },
    workoutDateD: {
        textAlign: "center",
        fontSize: "20px",
        height: "20px",
    },
    workoutDateM: {
        textAlign: "center",
        fontSize: "12px",
        height: "12px",
    },
    workoutDateY: {
        textAlign: "center",
        fontSize: "15px",
    },
    workoutItem: {
        borderLeft: "3px solid orange",
        marginBottom: "10px",
        boxShadow: "0 1px 2px 1px #00000011",
        overflow: "hidden",
    },
    tagsContainer:{
        width: "50%",
        transition: "1s",
        [theme.breakpoints.down('xs')]: {
            display: "none",
        },
    },
    workoutDelete: {
        paddingTop: 8,
        paddingRight: 5,
        color: "#444",
        display: "inline-block",
    },
    workoutCheckmark: {
        paddingTop: 8,
        color: "#444",
        display: "inline-block",
    },
    workoutChevron: {
        paddingTop: 8,
        color: "#444",
        marginLeft: 10,
        display: "inline-block",
    }
}));

function CalendarWorkout(props) {
    const classes = useStyles();

    var months = [ "January", "February", "March", "April",
    "May", "June", "July", "August", "September", "October",
    "November", "December" ];

    const day = props.date.split("-")[2];
    const month = props.date.split("-")[1];
    const year = props.date.split("-")[0];

    return(
        <div className={classes.workoutItem}>
            <ListItem button component="a" href="./workout">
                <div className={classes.leftContainer}>
                    <div className={classes.workoutDate}>
                        <div className={classes.workoutDateD}>{day}</div>
                        <div className={classes.workoutDateM}>{months[month - 1]}</div>
                        <div className={classes.workoutDateY}>{year}</div>
                    </div>
                    <ListItemText
                        className={classes.workoutTitle}
                        primary={props.title}
                        secondary={
                            <div style={{display: "flex", alignItems:"center"}}>
                                <LocationOnIcon></LocationOnIcon>
                                <div>{props.location}</div>
                            </div>
                        }
                    />
                </div>

                <div className={classes.tagsContainer}>
                    {props.tags.map((tag) => (
                        <Chip label={tag.name} style={{margin: "0 2px"}}></Chip>
                    ))}
                </div>
                <div className={classes.rightContainer}>
                    <div className={classes.workoutCheckmark}><CheckCircleOutlineIcon></CheckCircleOutlineIcon></div>
                    <div class={classes.workoutChevron}><ChevronRightIcon></ChevronRightIcon></div>
                </div>
            </ListItem>
        </div>
    );
}

export default CalendarWorkout;