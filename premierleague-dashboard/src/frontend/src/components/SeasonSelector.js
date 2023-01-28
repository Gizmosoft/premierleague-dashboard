import {React} from 'react';
import { Link } from 'react-router-dom';

import './SeasonSelector.scss';

export const SeasonSelector = ({teamName}) => {

    let seasons = [];

    const startSeason = process.env.REACT_APP_DATA_START_SEASON;
    const endSeason = process.env.REACT_APP_DATA_END_SEASON;

    for(let i=startSeason; i<=endSeason; i++){
        let incrSeason = parseInt(i)+1;
        seasons.push(Number(i) + "-" + incrSeason);
    }

    return (
        <ul className='SeasonSelector'>
        {seasons.map(season => (
            <li key={season}>
                <Link to={`/teams/${teamName}/matches/${season}`}>{season}</Link>
            </li>
            )
        )}
        </ul>
    );

}