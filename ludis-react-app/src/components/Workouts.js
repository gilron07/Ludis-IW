import React, { useState } from 'react';
import Header from './Header.js';
import '../css/Workouts.css';
import WorkoutComponent from './WorkoutComponent.js';
import List from '@material-ui/core/List';
import { NavLink } from 'react-router-dom';
import axiosAPI from '../services/authAxios'


// icons
import AddCircleIcon from '@material-ui/icons/AddCircle';

class Workouts extends React.Component {
    constructor(props) {
        super(props);
    }
    async componentDidMount() {
       const data = await axiosAPI.get('/workouts');
       console.log(data.data)
    }

    render() {
        function newWorkout() {
            alert("yo");
        }

        return(
            <div id="calendar-workouts">
                <Header></Header>
                <h1>Workouts</h1>
                <List>
                    <WorkoutComponent title="Workout 1" completed="true"></WorkoutComponent>
                    <WorkoutComponent title="Workout 2" completed="false"></WorkoutComponent>
                    <WorkoutComponent title="Workout 3" completed="true"></WorkoutComponent>
                    <WorkoutComponent title="Workout 4" completed="false"></WorkoutComponent>
                    <WorkoutComponent title="Workout 5" completed="false"></WorkoutComponent>
                    <WorkoutComponent title="Workout 6" completed="true"></WorkoutComponent>
                </List>
                <div id="create-workout-button" onClick="newWorkout">
                    <NavLink to={"create-workout"}>
                        <AddCircleIcon color="primary" style={{ fontSize: 40}}></AddCircleIcon>
                    </NavLink>
                </div>
            </div>
        )
    }
}

export default Workouts;