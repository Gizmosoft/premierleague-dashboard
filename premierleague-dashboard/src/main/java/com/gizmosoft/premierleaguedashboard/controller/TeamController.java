package com.gizmosoft.premierleaguedashboard.controller;

import com.gizmosoft.premierleaguedashboard.model.Match;
import com.gizmosoft.premierleaguedashboard.model.Team;
import com.gizmosoft.premierleaguedashboard.repository.MatchRepository;
import com.gizmosoft.premierleaguedashboard.repository.TeamRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class TeamController {

    private TeamRepository teamRepository;
    private MatchRepository matchRepository;

    public TeamController(TeamRepository teamRepository, MatchRepository matchRepository) {
        this.teamRepository = teamRepository;
        this.matchRepository = matchRepository;
    }

    @GetMapping("/teams")
    public Iterable<Team> getAllTeams(){
        return this.teamRepository.findAll();
    }

    @GetMapping("/teams/{teamName}")
    public Team getTeam(@PathVariable String teamName){
        Team team = this.teamRepository.findByTeamName(teamName);
        // populate 'team' with last 5 matches data
        team.setMatches(matchRepository.findLatestMatchesByTeam(teamName, 5));

        return team;
    }

    @GetMapping("/teams/{teamName}/matches")
    public List<Match> getMatchForTeam(@PathVariable String teamName, @RequestParam String season){
        return this.matchRepository.findByTeamAndSeason(teamName, season);
    }
}
