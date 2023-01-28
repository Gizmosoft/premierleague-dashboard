import {React, useEffect, useState} from 'react';
import {MatchDetailCard} from '../components/MatchDetailCard';
import {MatchSmallCard} from '../components/MatchSmallCard'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

// import pie chart module
import { PieChart } from 'react-minimal-pie-chart';

import './TeamPage.scss';

export const TeamPage = () => {

  // useState({}) -> defines an initial state for the team
  const[team, setTeam] = useState({matches: []});

  // useParams gives us all the path params
  // we are using array destructuring to get the teamName from the path params
  const {teamName} = useParams();

  // getting end season from .env file and formatting it as per need
  const temp = parseInt(process.env.REACT_APP_DATA_END_SEASON) + 1;
  const endSeason = process.env.REACT_APP_DATA_END_SEASON + "-" + temp;


  useEffect(
    () => {
      const fetchTeams = async() => {
        // get the response using fetch() which would return a promise (which is an async object)
        // we can use await here as this is an async function
        const response = await fetch(`${process.env.REACT_APP_DATA_API_ROOT_URL}/teams/${teamName}`);

        // get data from the above received response
        const data = await response.json();

        // set the data as Team data to be received by the UI
        setTeam(data);
      };
      fetchTeams();
    // below empty array is called dependecy list which tells about how many times the useEffect needs to be called. Not defining this will cause an infinte loop of useEffects being called. Empty array signifies that call useEffect only once at page load.
    // keeping array value as a property of the match object signifies that the property needs to change after page load
    }, [teamName]
  );

  // Calculation of total win/loss/draw Percentages
  const totalLosses = Number(team.totalMatches) - (Number(team.totalWins) + team.totalDraws);
  const winPercentage = (Number(team.totalWins)/Number(team.totalMatches))*100;
  const lossPercentage = (totalLosses/Number(team.totalMatches))*100;
  const drawPercentage = (Number(team.totalDraws)/Number(team.totalMatches))*100;

  if(!team || !team.teamName){
    return <h1>Team Not Found!</h1>
  }

  return (
    <div className="TeamPage">
        <div className='team-name-section'><h1 className='team-name'>{team.teamName}</h1></div>
        <div className='win-loss-section'>Wins / Losses / Draws
          <PieChart
            data={[
              { title: 'Wins: ' + winPercentage.toFixed(2) + '%', value: Number(team.totalWins), color: '#5bcc5b' },
              { title: 'Losses: ' + lossPercentage.toFixed(2) + '%', value: totalLosses, color: '#e16565' },
              { title: 'Draws: ' + drawPercentage.toFixed(2) + '%', value: Number(team.totalDraws), color: '#d1d137' },
            ]}
          />
        </div>
        <div className='match-detail-card'>
          <h3 className='last-match-head'>Last Match Details</h3>
          <MatchDetailCard teamName={team.teamName} match={team.matches[0]}/>
        </div>
  
        {team.matches.slice(1).map(match => <MatchSmallCard teamName={team.teamName} key={match.id} match={match} />)}
        
        <div className='more-link'>
          <Link to={`/teams/${teamName}/matches/${endSeason}`}>More &gt;</Link>
        </div>
        <Link to={`/`}>&lt;&lt; Go Back to Home</Link>
    </div>
  );
}

