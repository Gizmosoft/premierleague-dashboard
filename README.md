# premierleague-dashboard
A Spring Boot web application to display Barclays Premier League match data from 2006-2018

### Technologies Used
> ### Programming Languages & Other Tools
>
> - Java Spring Boot 5
> - ReactJS/JSX
> - HTML/CSS
> - AWS Beanstalk
> - Postman

## Home Page
- Calls the API endpoint '/teams/' which shows a list of all the teams that played the league within the above time frame.
- Clicking on the team names would take you to the corresponding Team Page

## Team Page
- Call the API endpoint '/teams/<teamName>/' which shows the Win/Loss/Draw percentage of that team for the above timeframe along with the latest 5 matches details
- Clicking on any other team on the scorecard would take you to their respective Team Page
- Clicking on <MORE> option would take you to the Match Page of the respective team which has a history of all the match scores sorted by the Season which can be selected from the left hand side of the page.


## Database & Dataset
- The dataset used is from Kaggle which had a limited small data from 2006-07 season till 2017-18.
- The database being used here is HyperSQL (HSQL) DB which is an in-memory database which populates and runs whenever the backend Spring Boot application is up and running.
- Spring Batch framework was used to format the dataset as per the requirement and create a HSQL DB instance (Team and Match tables) from it.

## Backend
- The backend REST APIs have been created using Java Spring Boot (Java JDK 17 has been used for this project).

## FrontEnd & UI
- The UI is relatively kept simple using ReactJS and JSX along with HTML and a bit of CSS.
- React components are designed to consume the REST APIs created using Spring Boot framework and show UI correspondingly.

## Build & Deploy
- The ReactJS project for the UI was built separately from the Java Spring Boot project.
- In order to avoid hosting them separately, ReactJS project was built first and then the build was embedded to the Spring Boot project within resources/public so that it gets built along with the backend.
- Then the Spring Boot project was built into a JAR file which was hosted on AWS using AWS Elastic Beanstalk.
- The Live Project can be accessed from here: [Live on AWS](http://premierleaguedashboard-env.eba-rkmsps3g.us-east-1.elasticbeanstalk.com/) {this can be accessed only between 1:30 PM UTC & 9:30 PM UTC}
