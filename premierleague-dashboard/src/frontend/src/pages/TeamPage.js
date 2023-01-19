import {React, useEffect, useState} from 'react';
import {MatchDetailCard} from '../components/MatchDetailCard';
import {MatchSmallCard} from '../components/MatchSmallCard'

export const TeamPage = () => {

  // useState({}) -> defines an initial state for the team
  const[team, setTeam] = useState({matches: []});


  useEffect(
    () => {
      const fetchMatches = async() => {
        // get the response using fetch() which would return a promise (which is an async object)
        // we can use await here as this is an async function
        const response = await fetch('http://localhost:8081/teams/Manchester%20United');

        // get data from the above received response
        const data = await response.json();

        // set the data as Team data to be received by the UI
        setTeam(data);
      };
      fetchMatches();
    // below empty array is called dependecy list which tells about how many times the useEffect needs to be called. Not defining this will cause an infinte loop of useEffects being called. Empty array signifies that call useEffect only once at page load.
    }, []
  );

  return (
    <div className="TeamPage">
        <h1>{team.teamName}</h1>
        <MatchDetailCard match={team.matches[0]}/>
        {team.matches.slice(1).map(match => <MatchSmallCard key={match.id} match={match} />)}
    </div>
  );
}

