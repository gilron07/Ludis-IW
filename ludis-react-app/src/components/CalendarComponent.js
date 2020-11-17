import React from 'react';
import '../css/CalendarComponent.css';
import CalendarWorkout from './CalendarWorkout.js';
import List from '@material-ui/core/List';

function CalendarComponent(props) {
    const month = props.month;
    const week = props.week;

    return(
        <div id="calendar-workouts">
            <List>
                {props.weeklyWorkouts.map((workout) => (
                    <div>
                        {workout.title}
                    {/* <CalendarWorkout
                        title={workout.title}
                        month={month}
                        week={week}
                    ></CalendarWorkout> */}
                    </div>
                ))}
            </List>
        </div>
    )
}

export default CalendarComponent;