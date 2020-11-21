import React from 'react';
import Header from './Header.js';
import LeaderboardComponent from './LeaderboardComponent.js';
import LeaderboardModal from './LeaderboardModal.js';

const Leaderboards = () => {
   return (
      <div>
         <Header/>
         <h1>Leaderboards</h1>
         <p>Start a friendly competition with teammates!</p>
         {data.map((leaderboard) => (
               <LeaderboardComponent
                  title={leaderboard.title}
                  unit={leaderboard.unit.charAt(0).toUpperCase() + leaderboard.unit.slice(1)}
               ></LeaderboardComponent>
         ))}
         <LeaderboardModal></LeaderboardModal>
      </div>
    );
}
 
export default Leaderboards;


const data = [
   {
      "title" : "Backwards 50m",
      "unit" : "seconds"
   },
   {
      "title" : "Poker Pushups",
      "unit" : "reps"
   },
   {
      "title" : "Hurdle Challenge",
      "unit" : "meters"
   },
]