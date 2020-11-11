import React from 'react';
import '../css/CalendarWorkout.css';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

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
                            <Chip label= {tag.name}/>
                        ))
                    }
                </ListItem>
                {/* <FileCopyIcon></FileCopyIcon> */}
                <div class="workout-delete">
                    <IconButton onClick={props.workoutDelete} data-id={props.key}>
                        <DeleteIcon/>
                    </IconButton>
                </div>
                <div class="workout-chevron"><ChevronRightIcon></ChevronRightIcon></div>
            </ListItem>

        </div>
    )

}

export default CalendarWorkout;