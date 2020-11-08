import React, { useState, useEffect } from 'react';
import Header from './Header.js';
import '../css/Workouts.css';
import WorkoutComponent from './WorkoutComponent.js';
import List from '@material-ui/core/List';
import { NavLink } from 'react-router-dom';
import axiosAPI from '../services/authAxios'
// import axios from 'axios';
 


// icons
import AddCircleIcon from '@material-ui/icons/AddCircle';

// function App() {
//   const [data, setData] = useState({ hits: [] });
 
//   useEffect(() => {
//     const fetchData = async () => {
//       const result= await axiosAPI.get('/workouts/');
 
//       setData(result.data);
//     };
 
//     fetchData();
//   }, []);
 
//   return (
//     <ul>
//       {data.hits.map(item => (
//         <li key={item.objectID}>
//           <a href={item.url}>{item.title}</a>
//         </li>
//       ))}
//     </ul>
//   );
// }
 
// export default App;
async function componentDidMount() {
    // const data = await axiosAPI.get('/workouts/');
    // const data = {
    //     "id": 1,
    //     "title": "Technical Practice",
    //     "description": "Please come with appropriate spikes",
    //     "sections": [
    //         {
    //             "id": 1,
    //             "name": "warm up",
    //             "order": 1,
    //             "drills": [
    //                 {
    //                     "id": 1,
    //                     "drill_name": "B-skips",
    //                     "created_at": "2020-10-31T15:59:20.246136Z",
    //                     "order": 1,
    //                     "modifiers": [
    //                         {
    //                             "id": 1,
    //                             "modifier": "Reps",
    //                             "unit": null
    //                         },
    //                         {
    //                             "id": 2,
    //                             "modifier": "Time",
    //                             "unit": "minutes"
    //                         }
    //                     ]
    //                 }
    //             ]
    //         }
    //     ],
    //     "owner": "Henry Herrington"
    // }

    // console.log(data)
}

function getData() {
    const data = [{
        "id": 1,
        "title": "Technical Practice",
        "description": "Please come with appropriate spikes",
        "sections": [
            {
                "id": 1,
                "name": "warm up",
                "order": 1,
                "drills": [
                    {
                        "id": 1,
                        "drill_name": "B-skips",
                        "created_at": "2020-10-31T15:59:20.246136Z",
                        "order": 1,
                        "modifiers": [
                            {
                                "id": 1,
                                "modifier": "Reps",
                                "unit": null
                            },
                            {
                                "id": 2,
                                "modifier": "Time",
                                "unit": "minutes"
                            }
                        ]
                    }
                ]
            }, 
            {
                "id": 2,
                "name": "cool down",
                "order": 2,
                "drills": [
                    {
                        "id": 1,
                        "drill_name": "B-skips",
                        "created_at": "2020-10-31T15:59:20.246136Z",
                        "order": 1,
                        "modifiers": [
                            {
                                "id": 1,
                                "modifier": "Reps",
                                "unit": null
                            },
                            {
                                "id": 2,
                                "modifier": "Time",
                                "unit": "minutes"
                            }
                        ]
                    }
                ]
            }
        ],
        "owner": "Henry Herrington"
    },
    {
        "id": 2,
        "title": "Hard Workout",
        "description": "This is gonna be hard!",
        "sections": [
            {
                "id": 1,
                "name": "warm up",
                "order": 1,
                "drills": [
                    {
                        "id": 1,
                        "drill_name": "B-skips",
                        "created_at": "2020-10-31T15:59:20.246136Z",
                        "order": 1,
                        "modifiers": [
                            {
                                "id": 1,
                                "modifier": "Reps",
                                "unit": null
                            },
                            {
                                "id": 2,
                                "modifier": "Time",
                                "unit": "minutes"
                            }
                        ]
                    }
                ]
            }, 
            {
                "id": 2,
                "name": "cool down",
                "order": 2,
                "drills": [
                    {
                        "id": 1,
                        "drill_name": "B-skips",
                        "created_at": "2020-10-31T15:59:20.246136Z",
                        "order": 1,
                        "modifiers": [
                            {
                                "id": 1,
                                "modifier": "Reps",
                                "unit": null
                            },
                            {
                                "id": 2,
                                "modifier": "Time",
                                "unit": "minutes"
                            }
                        ]
                    }
                ]
            }
        ],
        "owner": "Coach Tsabkevich"
    }]

    return data;
}

function Workouts() {
    return(
        <div id="calendar-workouts">
            <Header></Header>
            <h1>Workouts</h1>
            {/* {componentDidMount()} */}
            <List>
                {/* getData returns the workout as an object */}
                { getData().map((workout) => (
                    <WorkoutComponent title={workout.title} creator={workout.owner} key={workout.id}></WorkoutComponent>
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