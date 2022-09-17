package com.gizmosoft.premierleaguedashboard.data;

// Data from CSV
public class MatchInput {
    private String home_team;
    private String away_team;
    private String home_goals;
    private String away_goals;
    private String result;
    private String season;

    public String getHome_team() {
        return home_team;
    }

    public void setHome_team(String home_team) {
        this.home_team = home_team;
    }

    public String getAway_team() {
        return away_team;
    }

    public void setAway_team(String away_team) {
        this.away_team = away_team;
    }

    public String getHome_goals() {
        return home_goals;
    }

    public void setHome_goals(String home_goals) {
        this.home_goals = home_goals;
    }

    public String getAway_goals() {
        return away_goals;
    }

    public void setAway_goals(String away_goals) {
        this.away_goals = away_goals;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getSeason() {
        return season;
    }

    public void setSeason(String season) {
        this.season = season;
    }
}
