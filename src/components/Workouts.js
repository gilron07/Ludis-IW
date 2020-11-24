import React, { useState, useEffect } from 'react';
import Header from './Header.js';
import { useConfirm } from 'material-ui-confirm';
import '../css/Workouts.css';
import WorkoutComponent from './WorkoutComponent.js';
import List from '@material-ui/core/List';
import { NavLink } from 'react-router-dom';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import {useLocation, useHistory} from 'react-router-dom';

import axiosAPI from '../services/authAxios'

// icons
import AddCircleIcon from '@material-ui/icons/AddCircle';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Workouts() {
    const [data, setData] = useState([]);
    const [openDelete, setOpenDelete] = React.useState(false);
    const [openSuccess, setOpenSucess] = React.useState(false);
    const confirm = useConfirm();

    // if page was rendered after successful workout create
    const location = useLocation();
    const history = useHistory();
    const locationState = location.state;

    const openSuccessSnack = () =>{
        setOpenSucess(true);
    };

    const openDeleteSnack = () =>{
        setOpenDelete(true);
    };
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenSucess(false);
        setOpenDelete(false);
    }

    const workoutDelete = (id) => {
        axiosAPI.delete(`/workouts/${id}/`)
            .then(res =>{
                setData(data.filter(item => item.id != id));
                openDeleteSnack()
            })
            .catch(err =>{
                console.log(err)
            });
    }
    const handleDelete = (e) => {
        const id = e.currentTarget.getAttribute("workoutid");
        confirm({description:'This action is permanent'})
            .then(() => {
                workoutDelete(id);
            })
            .catch(() =>{
                console.log("Deletion cancelled");
            });

    };

    // useEffect(() =>{
    //     const fetchData = async () =>{
    //       const result = await axiosAPI.get('/workouts/');
    //       setData(result.data)
    //     };
    //     fetchData();
    //     if (location.state && location.state.created){
    //         let state = {...history.location.state};
    //         delete state.created
    //         history.replace({...history.location, state})
    //         openSuccessSnack();
    //     }
    // }, []);

    return(
        <div id="calendar-workouts">
            <Header></Header>
            <h1>Workouts</h1>
            {/* {componentDidMount()} */}
            <List>
                {/* getData returns the workout as an object */}
                 {data.map((workout) => (
                    <WorkoutComponent
                        workout={workout}
                        title={workout.title}
                        creator={workout.owner}
                        created_at={workout.created_at}
                        key={workout.id}
                        id = {workout.id}
                        tags={workout.tags}
                        workoutDelete={handleDelete}
                    ></WorkoutComponent>
                ))}
                {/* Offline Data */}
								{exampleWorkouts.map((workout) => (
                    <WorkoutComponent
                        workout={workout}
                        title={workout.title}
                        creator={workout.owner}
                        created_at={workout.created_at}
                        key={workout.id}
                        id = {workout.id}
                        tags={workout.tags}
                        workoutDelete={handleDelete}
                    ></WorkoutComponent>
                ))}
            </List>
            <div id="create-workout-button" onClick="newWorkout">
                <NavLink to="create-workout">
                    <AddCircleIcon color="primary" style={{ fontSize: 40}}></AddCircleIcon>
                </NavLink>
            </div>
            {/*<Button variant="outlined" onClick={openSuccessSnack}>*/}
            {/*    Open success snackbar*/}
            {/*</Button>*/}
            <Snackbar open={openDelete} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="info">
                    The workout was successfully deleted!
                </Alert>
            </Snackbar>
            <Snackbar open={openSuccess} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Workout was successfully created!
                </Alert>
            </Snackbar>
        </div>
    )
}

const exampleWorkouts = [
	{
		"title": "My Workout",
		"created_at": "2020-10-31T15:59:20.246136Z",
		"description": "",
		"tags": [{"name": "yonkers"}],
		"sections": [
			{
				"id": 0,
				"name": "Swim 1",
				"order":1,
				"drills": [
						{
								"id": 2,
								"drill_name": "Call 1",
								"order": 1,
								"modifiers": []
						},
						{
							"id": 3,
							"drill_name": "Cald 1",
							"order": 1,
							"modifiers": []
					}
				]
			}
		],
		"owner": "Gilron Tsabkevich"
	},
	{
		"title": "My Workout 2",
		"created_at": "2021-06-14T15:59:20.246136Z",
		"description": "",
		"tags": [{"name":"tag"}],
		"sections": [
			{
				"id": 5,
				"name": "Jumpers 2",
				"order": 1,
				"drills": [
						{
								"id": 1,
								"drill_name": "Run Fast 2",
								"created_at": "2020-10-31T15:59:20.246136Z",
								"order": 1,
								"modifiers": []
						}
				]
			},
			{
				"id": 6,
				"name": "Swimmies 2",
				"order": 1,
				"drills": [
						{
								"id": 1,
								"drill_name": "Run Fast!!",
								"created_at": "2020-10-31T15:59:20.246136Z",
								"order": 1,
								"modifiers": []
						}
				]
			}
		],
		"owner": "Henry"
	}
];

export default Workouts;
