import React, {Component, useState, useMemo, useEffect} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ConfirmProvider } from "material-ui-confirm";

import {ProtectedRoute} from "./services/ProtectedRoute";
import LocalStorageService from "./services/LocalStorageService";
import axiosAPI from "./services/authAxios"
// Theme imports
import theme from './components/Theme.js'
import { ThemeProvider } from '@material-ui/core/styles'
 
import "./css/App.css";
import Home from './components/Home';
import Settings from './components/Settings';
import Workouts from './components/Workouts';
import Workout from './components/Workout';
import CreateWorkout from './components/CreateWorkout';
import Leaderboards from './components/Leaderboards';
import Error from './components/Error';
import Login from "./components/Login";
import Signup from "./components/Signup";
import {UserContext} from "./services/UserContext";

 
export default function App() {
    const [user, setUser] = useState(null);
    const value = useMemo(() => ({user, setUser}), [user, setUser])

    // useEffect(() =>{
    //     const loggedInUser = LocalStorageService.getAccessToken();
    //     if (loggedInUser){
    //         // Get user's data from server
    //         axiosAPI.post('/token/verify/')
    //             .then((user) => {
    //                 setUser(user.data);
    //                 console.log("User Verified");
    //             })
    //             .catch((err) =>{
    //                 console.log(err)
    //             });
    //     }
    // },[])
    
    return (
       <ConfirmProvider>
          <ThemeProvider theme={theme}>
              <UserContext.Provider value={value}>
                <BrowserRouter>
                    <div>
                        <Switch>
                          {/* should be ProtectedRoute */}
                         <ProtectedRoute path="/home" component={Home} exact/>
                         <ProtectedRoute path="/workouts" component={Workouts} exact/>
                         <ProtectedRoute path="/workout" component={Workout} exact/>
                         <ProtectedRoute path="/create-workout" component={CreateWorkout} exact/>
                         <ProtectedRoute path="/leaderboards" component={Leaderboards} exact/>
                         <ProtectedRoute path="/settings" component={Settings} exact/>
                         <Route path="/signup" component={Signup} exact/>
                         <Route path="/login" component={Login} exact/>
                         <Route path="/" component={Login} exact/>
                         <Route component={Error}/>
                       </Switch>
                    </div>
                </BrowserRouter>
              </UserContext.Provider>
        </ThemeProvider>
      </ConfirmProvider>
    );
}
