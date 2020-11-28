import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import { Link } from 'react-router-dom';

// icons
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles((theme) => ({
    workoutItem: {
        borderLeft: "3px solid orange",
        marginBottom: "10px",
        boxShadow: "0 1px 2px 1px #00000011",
        position: "relative",
    },
    tagContainer : {
        [theme.breakpoints.down('xs')]: {
            display: "none",
        },
        width: "100%",
        marginRight: 30,
    }
}));


export default function WorkoutComponent(props){
    const classes = useStyles();

    function formatDate() {
        const creationDate = props.workout.created_at.split("T")[0].split("-");
        return `${creationDate[1]}/${creationDate[2]}/${creationDate[0]}`;
    }

    return(
        <div className={classes.workoutItem}>
            <Link
                style={{textDecoration:"none", color: "inherit"}}
                to={{
                    pathname: "/workout",
                    scheduledWorkout: null,
                    baseWorkoutId: props.workout.id
                }}
            >
            <ListItem button>
                <div
                    style={{
                        width: "30%",
                        minWidth: 250,
                        overflow: "hidden",
                    }}
                >
                    {props.workout.title}
                    <div style={{
                        color: "#777",
                        fontSize: 12,
                    }}>
                        Created by {props.workout.owner} <br></br>
                        {formatDate()}
                    </div>
                </div>

                <div className={classes.tagContainer}>
                    {
                        props.workout.tags.map((tag) =>(
                            <Chip label= {tag.name} style={{margin: "1px 5px"}}/>
                        ))
                    }
                </div>
                {/* <FileCopyIcon></FileCopyIcon> */}
                {/*<ListItemSecondaryAction>*/}
                {/*    <IconButton>*/}
                {/*        <ChevronRightIcon/>*/}
                {/*    </IconButton>*/}
                {/*</ListItemSecondaryAction>*/}
                 {/*<div class="workout-chevron"></ChevronRightIcon></div>*/}
            </ListItem>
            </Link>

            <div style={{position: "absolute", bottom: 0, right: 20, height: "100%"}}>
                <div style={{position: "relative", top: "50%", transform:"translateY(-50%)"}}>
                {/* <Link
                    style={{textDecoration:"none", color: "inherit"}}
                    to={{
                        pathname: "/create-workout",
                        workout: props.workout // object representing workout
                    }}
                >
                    <IconButton size="small">
                        <EditIcon/>
                    </IconButton>
                </Link> */}
                    <IconButton onClick={props.workoutDelete} workoutid={props.workout.id} size="small">
                        <DeleteIcon/>
                    </IconButton>
                </div>
            </div>

        </div>
    )
}