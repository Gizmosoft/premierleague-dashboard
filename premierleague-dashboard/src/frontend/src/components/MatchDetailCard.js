import {React} from 'react';
import { Link } from 'react-router-dom';

import './MatchDetailCard.scss';

export const MatchDetailCard = ({teamName, match}) => {
  if (!match) return null;

  // code to construct home and away team routes
  const homeTeamRoute = `/teams/${match.homeTeam}`;
  const awayTeamRoute = `/teams/${match.awayTeam}`;

  // create boolean for matchwinner to check if the concerned team has won that match or not
  const isMatchWon = teamName === match.result;

  if(match.result === 'Match Drawn'){ 
    return (
      <div className="MatchDetailCard draw-card">
          <h3 className='last-game-score'><Link to={homeTeamRoute}>{match.homeTeam}</Link> <span className='goals-section'>{match.homeGoals}</span> : <span className='goals-section'>{match.awayGoals}</span> <Link to={awayTeamRoute}>{match.awayTeam}</Link></h3>
          <p className='result-note'>Match ended in a Tie</p>
          <div>
            <p className='season-section'>Season: {match.season}</p>
          </div>
  
      </div>
    );
  }
  
  return (
    <div className={isMatchWon ? 'MatchDetailCard won-card' : 'MatchDetailCard lost-card'}>
        <h3 className='last-game-score'><Link to={homeTeamRoute}>{match.homeTeam}</Link> <span className='goals-section'>{match.homeGoals}</span> : <span className='goals-section'>{match.awayGoals}</span> <Link to={awayTeamRoute}>{match.awayTeam}</Link></h3>
        <p className='result-note'>{match.result} won the match</p>
        <div>
          <p className='season-section'>Season: {match.season}</p>
        </div>

    </div>
  );
}