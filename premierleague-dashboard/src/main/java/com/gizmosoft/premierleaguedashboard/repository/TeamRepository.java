package com.gizmosoft.premierleaguedashboard.repository;

import com.gizmosoft.premierleaguedashboard.model.Team;
import org.springframework.data.repository.CrudRepository;

public interface TeamRepository extends CrudRepository<Team, Long> {

    Team findByTeamName(String teamName);
}
