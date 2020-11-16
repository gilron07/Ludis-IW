import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ConfirmProvider } from "material-ui-confirm";

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

 
class App extends Component {
  render() {
    return (
       <ConfirmProvider>
          <ThemeProvider theme={theme}>
           <BrowserRouter>
            <div>
                <Switch>
                 <Route path="/home" component={Home} exact/>
                 <Route path="/workouts" component={Workouts} exact/>
                 <Route path="/workout" component={Workout} exact/>
                 <Route path="/create-workout" component={CreateWorkout} exact/>
                 <Route path="/leaderboards" component={Leaderboards} exact/>
                 <Route path="/settings" component={Settings} exact/>
                 <Route path="/signup" component={Signup} exact/>
                 <Route path="/login" component={Login} exact/>
                 <Route path="/" component={Login} exact/>
                 <Route component={Error}/>
               </Switch>
            </div> 
          </BrowserRouter>
      </ThemeProvider>
      </ConfirmProvider>
    );
  }
}
 
export default App;