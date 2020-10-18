import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
 
import "./App.css";
import Header from './components/Header.js';
import Home from './components/Home';
import Settings from './components/Settings';
import Workouts from './components/Workouts';
import Leaderboards from './components/Leaderboards';
import Error from './components/Error';
import Navigation from './components/Navigation';
 
class App extends Component {
  render() {
    return (      
       <BrowserRouter>
        <div>
          <Header />
          <Navigation />
            <Switch>
             <Route path="/home" component={Home} exact/>
             <Route path="/workouts" component={Workouts}/>
             <Route path="/leaderboards" component={Leaderboards}/>
             <Route path="/settings" component={Settings}/>
            <Route component={Error}/>
           </Switch>
        </div> 
      </BrowserRouter>
    );
  }
}
 
export default App;