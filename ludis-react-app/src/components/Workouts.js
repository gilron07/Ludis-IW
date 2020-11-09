import React, { useState, useEffect } from 'react';
import Header from './Header.js';
import '../css/Workouts.css';
import WorkoutComponent from './WorkoutComponent.js';
import List from '@material-ui/core/List';
import { NavLink } from 'react-router-dom';
import axiosAPI from '../services/authAxios'




// icons
import AddCircleIcon from '@material-ui/icons/AddCircle';

function Workouts() {
    const [data, setData] = useState([]);

    useEffect(() =>{
        const fetchData = async () =>{
          const result = await axiosAPI.get('/workouts/');
          setData(result.data)
        };
        fetchData();
    }, []);
    return(
        <div id="calendar-workouts">
            <Header></Header>
            <h1>Workouts</h1>
            {/* {componentDidMount()} */}
            <List>
                {/* getData returns the workout as an object */}
                {data.map((workout) => (
                    <WorkoutComponent title={workout.title} creator={workout.owner} created_at={workout.created_at} key={workout.id} tags={workout.tags}></WorkoutComponent>
                ))}
            </List>
            <div id="create-workout-button" onClick="newWorkout">
                <NavLink to={"create-workout"}>
                    <AddCircleIcon color="primary" style={{ fontSize: 40}}></AddCircleIcon>
                </NavLink>
            </div>
        </div>
    )
}

export default Workouts;