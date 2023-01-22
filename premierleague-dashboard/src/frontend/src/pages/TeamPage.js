import {React, useEffect, useState} from 'react';
import {MatchDetailCard} from '../components/MatchDetailCard';
import {MatchSmallCard} from '../components/MatchSmallCard'
import { useParams } from 'react-router-dom';

// import pie chart module
import { PieChart } from 'react-minimal-pie-chart';

import './TeamPage.scss';

export const TeamPage = () => {

  // useState({}) -> defines an initial state for the team
  const[team, setTeam] = useState({matches: []});

  // useParams gives us all the path params
  // we are using array destructuring to get the teamName from the path params
  const {teamName} = useParams();


  useEffect(
    () => {
      const fetchMatches = async() => {
        // get the response using fetch() which would return a promise (which is an async object)
        // we can use await here as this is an async function
        const response = await fetch(`http://localhost:8081/teams/${teamName}`);

        // get data from the above received response
        const data = await response.json();

        // set the data as Team data to be received by the UI
        setTeam(data);
      };
      fetchMatches();
    // below empty array is called dependecy list which tells about how many times the useEffect needs to be called. Not defining this will cause an infinte loop of useEffects being called. Empty array signifies that call useEffect only once at page load.
    // keeping array value as a property of the match object signifies that the property needs to change after page load
    }, [teamName]
  );

  if(!team || !team.teamName){
    return <h1>Team Not Found!</h1>
  }

  console.log(team.teamName)
  console.log(team.totalMatches)
  console.log(team.totalWins)
  console.log(team.totalDraws)
  return (
    <div className="TeamPage">
        <div className='team-name-section'><h1 className='team-name'>{team.teamName}</h1></div>
        <div className='win-loss-section'>Wins / Losses / Draws
          <PieChart
            data={[
              { title: 'Wins', value: Number(team.totalWins), color: '#5bcc5b' },
              { title: 'Losses', value: Number(team.totalMatches) - (Number(team.totalWins) + team.totalDraws), color: '#e16565' },
              { title: 'Draws', value: Number(team.totalDraws), color: '#d1d137' },
            ]}
          />
        </div>
        <div className='match-detail-card'>
          <h3 className='last-match-head'>Last Match Details</h3>
          <MatchDetailCard teamName={team.teamName} match={team.matches[0]}/>
        </div>
  
        {team.matches.slice(1).map(match => <MatchSmallCard teamName={team.teamName} key={match.id} match={match} />)}
        
        <div className='more-link'>
          <a href='#'>More &gt;</a>
        </div>
    </div>
  );
}

