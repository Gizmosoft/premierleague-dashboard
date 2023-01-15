package com.gizmosoft.premierleaguedashboard.repository;

import com.gizmosoft.premierleaguedashboard.model.Match;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface MatchRepository extends CrudRepository<Match, Long> {

    // get match details of matches where the searched team is either home_team or away_team using Spring Data JPA
    List<Match> findByHomeTeamOrAwayTeamOrderBySeasonDesc(String teamName1, String teamName2, Pageable pageable);

    // create method implementation in interfaces using default method keywords
    default List<Match> findLatestMatchesByTeam(String teamName, int count){
        return findByHomeTeamOrAwayTeamOrderBySeasonDesc(teamName, teamName, PageRequest.of(0, count));
    }
}
