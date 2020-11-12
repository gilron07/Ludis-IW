import React from 'react';
import '../css/CalendarWorkout.css';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';


// icons
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DeleteIcon from '@material-ui/icons/Delete';
import Chip from '@material-ui/core/Chip';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';

function CalendarWorkout(props){

    return(
        <div className="workout-item">
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
                {/* <div class="workout-chevron"><ChevronRightIcon></ChevronRightIcon></div> */}
            </ListItem>

        </div>
    )

}

export default CalendarWorkout;