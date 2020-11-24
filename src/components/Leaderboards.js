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
                  id={leaderboard.id}
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
      "id" : "1",
      "title" : "Backwards 50m",
      "unit" : "seconds"
   },
   {
      "id" : "2",
      "title" : "Poker Pushups",
      "unit" : "reps"
   },
   {
      "id" : "3",
      "title" : "Hurdle Challenge",
      "unit" : "meters"
   },
]