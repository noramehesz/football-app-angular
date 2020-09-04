import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompetitionsService } from '../competitions.service';
import { ShareCompetitionsService } from '../share-competitions.service';

interface MatchDetails {
  competitionName?: string;
  teams?: {homeTeam: string, awayTeam: string};
  score?: any;
  status?: any;
  date?: any;
  matchClock?: any;
  minute?: any;
}

@Component({
  selector: 'app-match-details',
  templateUrl: './match-details.component.html',
  styleUrls: ['./match-details.component.css']
})
export class MatchDetailsComponent implements OnInit {
  competitionName: string;
  matchId: string;
  matchDetails;

  constructor(
    private route: ActivatedRoute,
    private competitionService: CompetitionsService,
    private shareData: ShareCompetitionsService,
  ) { }

  ngOnInit() {
    this.competitionName = this.route.snapshot.paramMap.get('competition');
    console.log(this.competitionName);  
    this.matchId = this.route.snapshot.paramMap.get('matchId');
    let competitionId;
    this.competitionService.getCompetitions().subscribe((comp: any) => { 
      console.log(comp.competitions)
      competitionId = comp.competitions.filter(c => {return c.name === this.competitionName})[0].id;
      this.getMatchDetailsById(competitionId, this.matchId);
    });
  }

  getMatchDetailsById(compId: string, id: string) {
    this.competitionService.getMatchDetailsById(id).subscribe((details: any) => {
      console.log(details);
        let data: MatchDetails = {};
        data.competitionName = details.match.competition.name;
        data.date = details.match.utcDate;
        data.minute = details.match.minute == null ? 0 : details.minute;
        data.score = details.match.score;
        data.status = details.match.status;
        data.teams = {homeTeam: '', awayTeam: ''};
        data.teams.homeTeam = details.match.homeTeam.name;
        data.teams.awayTeam = details.match.awayTeam.name; 
        let dateNtime = new Date(details.match.utcDate);
        let date = dateNtime.getFullYear()+'-'+(dateNtime.getMonth()+1)+'-'+dateNtime.getDate();
        let time = dateNtime.getHours() + ":" + (dateNtime.getMinutes() === 0 ? '00' : dateNtime.getMinutes());
        data.date = date + ' ' + time;
        this.matchDetails = data;
      }
    )
  }

  getHalf(minute: number) {
    return minute <= 45 ? "First Half" : "Second Half";
  }
}
