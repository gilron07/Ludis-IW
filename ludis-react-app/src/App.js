import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Theme imports
import theme from './components/Theme.js'
import { ThemeProvider } from '@material-ui/core/styles'
 
import "./css/App.css";
import Home from './components/Home';
import Landing from './components/Landing';
import Settings from './components/Settings';
import Workouts from './components/Workouts';
import CreateWorkout from './components/CreateWorkout';
import Leaderboards from './components/Leaderboards';
import Error from './components/Error';

 
class App extends Component {
  render() {
    return (   
      <ThemeProvider theme={theme}>
       <BrowserRouter>
        <div>
            <Switch>
             <Route path="/" component={Landing} exact/>
             <Route path="/home" component={Home} exact/>
             <Route path="/workouts" component={Workouts} exact/>
             <Route path="/create-workout" component={CreateWorkout} exact/>
             <Route path="/leaderboards" component={Leaderboards} exact/>
             <Route path="/settings" component={Settings} exact/>
             <Route component={Error}/>
           </Switch>
        </div> 
      </BrowserRouter>
      </ThemeProvider>
    );
  }
}
 
export default App;