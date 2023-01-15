package com.gizmosoft.premierleaguedashboard.data;

import ch.qos.logback.core.net.SyslogOutputStream;
import com.gizmosoft.premierleaguedashboard.model.Team;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.listener.JobExecutionListenerSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class JobCompletionNotificationListener extends JobExecutionListenerSupport{
    private static final Logger log = LoggerFactory.getLogger(JobCompletionNotificationListener.class);

    //private final JdbcTemplate jdbcTemplate;
    private final EntityManager em;

    @Autowired
//    public JobCompletionNotificationListener(JdbcTemplate jdbcTemplate) {
//        this.jdbcTemplate = jdbcTemplate;
//    }
    public JobCompletionNotificationListener(EntityManager em) {
        this.em = em;
    }

    @Override
    @Transactional
    public void afterJob(JobExecution jobExecution) {
        if(jobExecution.getStatus() == BatchStatus.COMPLETED) {
            log.info("!!! JOB FINISHED! Dataset transferred to SQL DB");

//            jdbcTemplate.query("SELECT id, result, season FROM match",
//                    (rs, row) -> "id: " + rs.getString(1) + " result: " + rs.getString(2) + ", season: " + rs.getString(3)
//            ).forEach(System.out::println); // In place of str-> syso(str) lambda function, we can use this

            // create a teamData map to store all individual team info
            // map of team names to team instances
            Map<String, Team> teamData = new HashMap<>();

            // get unique team names and count of all matches played by that team from each row of the dataset
            em.createQuery("select m.home_team, count(*) from Match m group by m.home_team", Object[].class)
                    .getResultList()
                    .stream()
                    .map(e -> new Team(e[0].toString(), e[1].toString()))
                    .forEach(team -> teamData.put(team.getTeamName(), team));

            em.createQuery("select m.away_team, count(*) from Match m group by m.away_team", Object[].class)
                    .getResultList()
                    .stream()
                    .forEach(e -> {
                        Team team = teamData.get(e[0].toString());
                        int num = Integer.parseInt(team.getTotalMatches()) + Integer.parseInt(e[1].toString());
                        team.setTotalMatches(String.valueOf(num));
                    });

            em.createQuery("select m.result, count(*) from Match m group by m.result", Object[].class)
                    .getResultList()
                    .stream()
                    .forEach(e -> {
                        Team team = teamData.get(e[0].toString());
                        if(team != null)
                            team.setTotalWins(e[1].toString());
                    });

            teamData.values().forEach(team -> em.persist(team));
            teamData.values().forEach(team -> System.out.println(team));
        }
    }
}
