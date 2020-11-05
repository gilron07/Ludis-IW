import React from 'react';
import '../css/CalendarWorkout.css';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
class CalendarWorkout extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="workout-item">
                <ListItem button component="a" href="./workout"> 
                    <div class="workout-date">
                        <div class="workout-date-d">1</div>
                        <div class="workout-date-m">{this.props.month}</div>
                        <div class="workout-date-y">2020</div>
                    </div>
                    <ListItemText primary={this.props.title} secondary={this.props.month + ", week " + this.props.week }/>
                    <div class="workout-checkmark"><CheckCircleOutlineIcon></CheckCircleOutlineIcon></div>
                    <div class="workout-chevron"><ChevronRightIcon></ChevronRightIcon></div>
                </ListItem>
            </div>
        )
    }
}

export default CalendarWorkout;