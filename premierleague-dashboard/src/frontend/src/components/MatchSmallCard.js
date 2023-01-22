import {React} from 'react';
import { Link } from 'react-router-dom';

import './MatchSmallCard.scss';

export const MatchSmallCard = ({match, teamName}) => {
  if (!match) return null;

  const homeTeamRoute = `/teams/${match.homeTeam}`;
  const awayTeamRoute = `/teams/${match.awayTeam}`;

  const isMatchWon = teamName === match.result;

  if(match.result === 'Match Drawn'){
    return (
      <div className="MatchSmallCard draw-card">
          <p><Link to={homeTeamRoute}>{match.homeTeam}</Link> <b>{match.homeGoals} : {match.awayGoals}</b> <Link to={awayTeamRoute}>{match.awayTeam}</Link></p> 
          <div className='season-section'>
            <p>Season: {match.season}</p>
          </div>
      </div>
    );
  }

  return (
    <div className={isMatchWon ? 'MatchSmallCard won-card' : 'MatchSmallCard lost-card'}>
        <p><Link to={homeTeamRoute}>{match.homeTeam}</Link> <b>{match.homeGoals} : {match.awayGoals}</b> <Link to={awayTeamRoute}>{match.awayTeam}</Link></p> 
        <div className='season-section'>
          <p>Season: {match.season}</p>
        </div>
    </div>
  );
}