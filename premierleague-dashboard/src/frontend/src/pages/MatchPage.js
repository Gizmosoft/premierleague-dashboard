import {React, useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import {MatchDetailCard} from '../components/MatchDetailCard';
import { SeasonSelector } from '../components/SeasonSelector';

import './MatchPage.scss';

export const MatchPage = () => {

    // define state
    const [matches, setMatches] = useState([]);
    
    // get parameters from URL defined in App.js
    const {teamName, season} = useParams();

    useEffect(
        () => {
          const fetchMatches = async() => {
            // get the response using fetch() which would return a promise (which is an async object)
            // we can use await here as this is an async function
            const response = await fetch(`http://localhost:8081/teams/${teamName}/matches?season=${season}`);
    
            // get data from the above received response
            const data = await response.json();
    
            // set the data as Team data to be received by the UI
            setMatches(data);
          };
          fetchMatches();
        }, [teamName, season]
      );

    return (
        <div className="MatchPage">
          <h1 className='match-page-head'>Match Page for {teamName} | Season: {season}</h1>
          <div className='season-selector'>
            <h3>Select Season:</h3>
            <SeasonSelector teamName={teamName} />
          </div>
          <div className='season-match-history'>
            {matches.map(match => <MatchDetailCard key={match.id} teamName={teamName} match={match} />)}
          </div>

        </div>
    );
}

