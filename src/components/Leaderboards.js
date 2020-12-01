import React, { useState, useContext, useRef, useEffect } from "react";
import Header from './Header.js';
import LeaderboardComponent from './LeaderboardComponent.js';
import LeaderboardModal from './LeaderboardModal.js';
import axiosAPI from '../services/authAxios'

const Leaderboards = () => {
   const [leaderboardData, setLeaderboardData] = useState([]);

   useEffect(() =>{
        const fetchLeaderboardData = async () =>{
          const result = await axiosAPI.get('/challenge/')
            setLeaderboardData(result.data);
        };
        fetchLeaderboardData();
   }, []);

   function getUnit(unit, mod) {
      if (unit.toLowerCase() !== "null") {
         return unit.charAt(0).toUpperCase() + unit.slice(1);
      }
      else {
         return mod.charAt(0).toUpperCase() + mod.slice(1);
      }
   }

   return (
      <div>
         <Header/>
         <h1>Leaderboards</h1>
         <p>Start a friendly competition with teammates!</p>
         {leaderboardData.map((leaderboard) => (
               <LeaderboardComponent
                  responses={leaderboard.responses}
                  id={leaderboard.id}
                  title={leaderboard.title}
                  setLeaderboardData={setLeaderboardData}
                  unit={getUnit(leaderboard.unit, leaderboard.modifier)}
               ></LeaderboardComponent>
         ))}
         <LeaderboardModal setLeaderboardData={setLeaderboardData}></LeaderboardModal>
      </div>
    );
}
 
export default Leaderboards;