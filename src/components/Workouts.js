import React, { useState, useEffect } from 'react';
import Header from './Header.js';
import { useConfirm } from 'material-ui-confirm';
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

    useEffect(() =>{
        const fetchData = async () =>{
          const result = await axiosAPI.get('/workouts/');
          setData(result.data)
        };
        fetchData();
        if (location.state && location.state.created){
            let state = {...history.location.state};
            delete state.created
            history.replace({...history.location, state})
            openSuccessSnack();
        }
    }, []);

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
                        key={workout.id}
                        workoutDelete={handleDelete}
                    ></WorkoutComponent>
                ))}
            </List>
            <div style={{textAlign: "center"}} onClick="newWorkout">
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

export default Workouts;
