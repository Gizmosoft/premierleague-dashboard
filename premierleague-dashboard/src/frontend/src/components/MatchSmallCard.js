import {React} from 'react';
import { Link } from 'react-router-dom';

export const MatchSmallCard = ({match}) => {
  if (!match) return null;

  const homeTeamRoute = `/teams/${match.homeTeam}`;
  const awayTeamRoute = `/teams/${match.awayTeam}`;

  return (
    <div className="MatchSmallCard">
        <p><Link to={homeTeamRoute}>{match.homeTeam}</Link> <b>{match.homeGoals} : {match.awayGoals}</b> <Link to={awayTeamRoute}>{match.awayTeam}</Link> (Season: {match.season})</p> 
    </div>
  );
}