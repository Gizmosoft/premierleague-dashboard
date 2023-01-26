import {React, useEffect, useState} from 'react';

import './HomePage.scss';
import { TeamTile } from '../components/TeamTile';

export const HomePage = () => {

  // useState({}) -> defines an initial state for the team
  const[teams, setTeams] = useState();

  useEffect(
    () => {
      const fetchAllTeams = async() => {
        
        const response = await fetch(`http://localhost:8081/teams`);

        // get data from the above received response
        const data = await response.json();

        // set the data as Team data to be received by the UI
        setTeams(data);
      };
      fetchAllTeams();
    // below empty array is called dependecy list which tells about how many times the useEffect needs to be called. Not defining this will cause an infinte loop of useEffects being called. Empty array signifies that call useEffect only once at page load.
    }, []
  );

  if(!teams){
    return <p>There is some issue with displaying the team names</p>
  }

  return (
    <div className="HomePage">
        <div className='header-section'>
            <h1 className='app-name'>Barclays Premier League Dashboard</h1>
        </div>
        <div className='sub-header-section'>
            <p>2006 - 2018</p>
        </div>

        {/* Grid to show the teams in UI */}
        <div className='team-grid'>
            { teams.map(team => <TeamTile key={team.id} teamName={team.teamName} />)}
        </div>

    </div>
  );
}

