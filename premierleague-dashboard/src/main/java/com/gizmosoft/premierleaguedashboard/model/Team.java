package com.gizmosoft.premierleaguedashboard.model;

import javax.persistence.*;
import java.util.List;

@Entity
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private String teamName;
    private String totalMatches;
    private String totalWins;

    private Long totalDraws;

    public Team() {
    }

    // through this we are telling JPA to ignore the below field from adding to the DB.
    @Transient
    private List<Match> matches;

    public List<Match> getMatches() {
        return matches;
    }

    public void setMatches(List<Match> matches) {
        this.matches = matches;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTeamName() {
        return teamName;
    }

    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    public String getTotalMatches() {
        return totalMatches;
    }

    public void setTotalMatches(String totalMatches) {
        this.totalMatches = totalMatches;
    }

    public String getTotalWins() {
        return totalWins;
    }

    public void setTotalWins(String totalWins) {
        this.totalWins = totalWins;
    }

    public Long getTotalDraws() {
        return totalDraws;
    }

    public void setTotalDraws(Long totalDraws) {
        this.totalDraws = totalDraws;
    }

    public Team(String teamName, String totalMatches) {
        this.teamName = teamName;
        this.totalMatches = totalMatches;
    }

    // custom constructor for totalDraws
    public Team(Long totalDraws) {
        this.totalDraws = totalDraws;
    }

    @Override
    public String toString() {
        return "Team{" +
                "id=" + id +
                ", teamName='" + teamName + '\'' +
                ", totalMatches='" + totalMatches + '\'' +
                ", totalWins='" + totalWins + '\'' +
                ", totalDraws='" + totalDraws + '\'' +
                '}';
    }
}
