import React from 'react';
import Header from './Header.js';
 
const Settings = () => {
    return (
       <div>
          <Header />
          <div style={{textAlign: "center"}}>
            <h1>About Ludis</h1>
            <div style={{width: "min(80vw, 800px)", margin: "auto"}}>
               <p>Ludis is a sports communication app created by Princeton University Computer Science concentrators Henry Herrington '22 and Gilron Tsabkevich '21. </p>
               <p>Please send any feedback concerning your Ludis experience to henrydh@princeton.edu</p>
            </div>
          </div>
       </div>
    );
}
 
export default Settings;