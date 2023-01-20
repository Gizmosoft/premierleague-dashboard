import {React} from 'react';
import { Link } from 'react-router-dom';

export const MatchDetailCard = ({match}) => {
  if (!match) return null;

  // code to construct home and away team routes
  const homeTeamRoute = `/teams/${match.homeTeam}`;
  const awayTeamRoute = `/teams/${match.awayTeam}`;
  
  return (
    <div className="MatchDetailCard">
        <h3>Last Match Details</h3>
        <h4><Link to={homeTeamRoute}>{match.homeTeam}</Link> {match.homeGoals} : {match.awayGoals} <Link to={awayTeamRoute}>{match.awayTeam}</Link> (Season: {match.season})</h4>

    </div>
  );
}