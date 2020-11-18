import React from 'react';
import '../css/CalendarComponent.css';
import CalendarWorkout from './CalendarWorkout.js';
import List from '@material-ui/core/List';

class CalendarComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    return(
        <div id="calendar-workouts">
            <List>
                {props.weeklyScheduledWorkouts.map((scheduledWorkout) => (
                    <div>
                    <CalendarWorkout
                        title={scheduledWorkout.workout.title}
                        tags={scheduledWorkout.workout.tags}
                        location={scheduledWorkout.location}
                        date={scheduledWorkout.date.split(" ")[0]}
                        time={scheduledWorkout.date.split(" ")[1]}
                        month={month}
                    ></CalendarWorkout>
                    </div>
                ))}
            </List>
        </div>
    )
}

export default CalendarComponent;