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
        match.setHome_team(matchInput.getHome_team());
        match.setAway_team(matchInput.getAway_team());
        match.setHome_goals(matchInput.getHome_goals());
        match.setAway_goals(matchInput.getAway_goals());

        if("H".equals(matchInput.getResult()))
            match.setResult(matchInput.getHome_team());
        else if("A".equals(matchInput.getResult()))
            match.setResult(matchInput.getAway_team());
        else
            match.setResult("Match Drawn");

        match.setSeason(matchInput.getSeason());

        return match;
    }

}
