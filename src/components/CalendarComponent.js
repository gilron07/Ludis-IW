import React from 'react';
import '../css/CalendarComponent.css';
import CalendarWorkout from './CalendarWorkout.js';
import List from '@material-ui/core/List';

function CalendarComponent(props) {

    if (props.weeklyScheduledWorkouts.length === 0) {
        return (
            <div style={{textAlign:"center", marginTop: "20px", color: "#777"}}>
                No workouts.</div>
        );
    }
    else return (
        <div id="calendar-workouts">
            <List>
                {props.weeklyScheduledWorkouts.map((scheduledWorkout) => (
                    <div>
                    <CalendarWorkout
                        workout={scheduledWorkout}
                        title={scheduledWorkout.workout.title}
                        workoutId={scheduledWorkout.id}
                        tags={scheduledWorkout.workout.tags}
                        location={scheduledWorkout.location}
                        date={scheduledWorkout.date.split(" ")[0]}
                        time={scheduledWorkout.date.split(" ")[1]}
                        month={props.month}
                        completion={[scheduledWorkout.reports.length, scheduledWorkout.athletes.length]}
                        effort={scheduledWorkout.average_effort}
                        role={props.role}
                    ></CalendarWorkout>
                    </div>
                ))}
            </List>
        </div>
    )
}

export default CalendarComponent;