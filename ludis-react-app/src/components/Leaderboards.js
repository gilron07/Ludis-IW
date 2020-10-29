import React from 'react';
import Header from './Header.js';
import LeaderboardComponent from './LeaderboardComponent.js';

import '../css/Leaderboards.css';

const Leaderboards = () => {

   const [open, setOpenA] = React.useState(true);
   const handleClick = () => {
      setOpenA(!open);
   };

   return (
      <div>
         <Header/>
         <h1>Leaderboards</h1>
         <p>Start a friendly competition with teammates!</p>
         
         <LeaderboardComponent title="Backwards 50m"></LeaderboardComponent>
         <LeaderboardComponent title="Poker Pushups"></LeaderboardComponent>
         <LeaderboardComponent title="Hurdle Challenge"></LeaderboardComponent>
      </div>
    );
}
 
export default Leaderboards;