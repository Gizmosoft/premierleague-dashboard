package com.gizmosoft.premierleaguedashboard.repository;

import com.gizmosoft.premierleaguedashboard.model.Match;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MatchRepository extends CrudRepository<Match, Long> {

    // get match details of matches where the searched team is either home_team or away_team using Spring Data JPA
    List<Match> findByHomeTeamOrAwayTeamOrderBySeasonDesc(String teamName1, String teamName2, Pageable pageable);

    // this is a named query way of getting match data
    @Query("select m from Match m where (m.homeTeam = :teamName or m.awayTeam = :teamName) and m.season = :season")
    List<Match> findByTeamAndSeason(@Param("teamName") String teamName, @Param("season") String season);

    // this is a Spring Data JPA way of creating queries through method names
    // build query to get matches for the passed season
//    List<Match> findByHomeTeamAndSeasonOrAwayTeamAndSeason(String teamName1, String season1, String teamName2, String season2);

    // create method implementation in interfaces using default method keywords
    default List<Match> findLatestMatchesByTeam(String teamName, int count){
        return findByHomeTeamOrAwayTeamOrderBySeasonDesc(teamName, teamName, PageRequest.of(0, count));
    }
}
