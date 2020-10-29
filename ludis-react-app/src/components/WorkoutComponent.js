import React from 'react';
import '../css/CalendarWorkout.css';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

// icons
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DeleteIcon from '@material-ui/icons/Delete';

class CalendarWorkout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="workout-item">
                <ListItem button>
                    <ListItemText primary={this.props.title} secondary={"Created by Henry Herrington"}/>
                    <div class="workout-delete"><DeleteIcon></DeleteIcon></div>
                    <div class="workout-checkmark"><CheckCircleOutlineIcon></CheckCircleOutlineIcon></div>
                    <div class="workout-chevron"><ChevronRightIcon></ChevronRightIcon></div>
                </ListItem>
            </div>
        )
    }
}

export default CalendarWorkout;