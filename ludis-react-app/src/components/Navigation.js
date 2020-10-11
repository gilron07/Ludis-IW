import React from 'react';
import '../css/Navigation.css';
import { NavLink } from 'react-router-dom';
 
const Navigation = () => {
    return (
       <div id="navigation-menu">
          <NavLink to="/">Home</NavLink><br></br>
          <NavLink to="/about">About</NavLink><br></br>
          <NavLink to="/contact">Contact</NavLink><br></br>
       </div>
    );
}
 
export default Navigation;