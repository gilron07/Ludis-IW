import React from 'react';
import '../css/CalendarComponent.css';
import CalendarWorkout from './CalendarWorkout.js';
import List from '@material-ui/core/List';

class CalendarComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div id="calendar-workouts">
                <List>
                    <CalendarWorkout title="Workout 1" month={this.props.month} week={this.props.week}></CalendarWorkout>
                    <CalendarWorkout title="Workout 2" month={this.props.month} week={this.props.week}></CalendarWorkout>
                    <CalendarWorkout title="Workout 3" month={this.props.month} week={this.props.week}></CalendarWorkout>
                </List>
            </div>
        )
    }
}

export default CalendarComponent;