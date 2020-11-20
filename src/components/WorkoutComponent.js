import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

// icons
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DeleteIcon from '@material-ui/icons/Delete';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';

const useStyles = makeStyles((theme) => ({
    workoutItem: {
        borderLeft: "3px solid orange",
        marginBottom: "10px",
        boxShadow: "0 1px 2px 1px #00000011",
    },
}));

function CalendarWorkout(props){
    const classes = useStyles();
    return(
        <div className={classes.workoutItem}>
            <ListItem button>
                <ListItemText primary={props.title} secondary={"Created by " + props.creator + " at " + props.created_at} />
                <ListItem>
                    {
                        props.tags.map((tag) =>(
                            <Chip label= {tag.name} style={{margin: "0 5px"}}/>
                        ))
                    }
                </ListItem>
                {/* <FileCopyIcon></FileCopyIcon> */}
                <ListItemSecondaryAction>
                    <IconButton onClick={props.workoutDelete} workoutid={props.id}>
                        <DeleteIcon/>
                    </IconButton>
                </ListItemSecondaryAction>
                {/*<ListItemSecondaryAction>*/}
                {/*    <IconButton>*/}
                {/*        <ChevronRightIcon/>*/}
                {/*    </IconButton>*/}
                {/*</ListItemSecondaryAction>*/}
                 {/*<div class="workout-chevron"></ChevronRightIcon></div>*/}
            </ListItem>

        </div>
    )

}

export default CalendarWorkout;