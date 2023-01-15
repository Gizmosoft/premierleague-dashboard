package com.gizmosoft.premierleaguedashboard.data;

import com.gizmosoft.premierleaguedashboard.model.Match;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.batch.item.ItemProcessor;

// Converts the MatchInput data from CSV to Match model data
public class MatchDataProcessor implements ItemProcessor<MatchInput, Match> {

    private static final Logger log = LoggerFactory.getLogger(MatchDataProcessor.class);

    @Override
    public Match process(final MatchInput matchInput) throws Exception {
        Match match = new Match();
        match.setId(Long.parseLong(matchInput.getId()));
        match.setHomeTeam(matchInput.getHomeTeam());
        match.setAwayTeam(matchInput.getAwayTeam());
        match.setHomeGoals(matchInput.getHomeGoals());
        match.setAwayGoals(matchInput.getAwayGoals());

        if("H".equals(matchInput.getResult()))
            match.setResult(matchInput.getHomeTeam());
        else if("A".equals(matchInput.getResult()))
            match.setResult(matchInput.getAwayTeam());
        else
            match.setResult("Match Drawn");

        match.setSeason(matchInput.getSeason());

        return match;
    }

}
