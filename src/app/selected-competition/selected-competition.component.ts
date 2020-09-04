import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompetitionsService } from '../competitions.service';

interface Match {
  homeTeam: string;
  awayTeam: string;
  date: any;
  id: string;
}

@Component({
  selector: 'app-selected-competition',
  templateUrl: './selected-competition.component.html',
  styleUrls: ['./selected-competition.component.css'],
})
export class SelectedCompetitionComponent implements OnInit {
  matches;
  competitionName: string;
  showLiveMathes: boolean = true;
  liveMatches: Math[] = [];
  otherMatches: Match[] = [];
  isLiveEmpty: boolean = true;
  isOngoingEmpty: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private competitionService: CompetitionsService,
  ) {}

  ngOnInit() {
    let league: string = this.route.snapshot.paramMap.get('competition');
    this.competitionName = league;
    let id: number;
    this.competitionService.getCompetitions().subscribe((comps: any) => {
      id = comps.competitions.filter((comp: any) => {
        return comp.name === league;
      })[0].id as number;
      this.getMatches(id);
    })
  }

  getMatches(competitionId: number) {
    this.competitionService.getMatchesForCompetition(competitionId).subscribe((matches: any) => {
      this.matches = matches;
      // Live matches, which status can be LIVE or IN_PLAY
      let livematches = matches.matches.filter((match: any) => {return match.status === "LIVE" || match.status === "IN_PLAY"});
      this.liveMatches = livematches.map((match) => {
        let data: Match = {homeTeam: '', awayTeam: '', date: {}, id:''};
        data.awayTeam = match.awayTeam.name;
        data.homeTeam = match.homeTeam.name;
        let dateNtime = new Date(match.utcDate);
        let date = dateNtime.getFullYear()+'-'+(dateNtime.getMonth()+1)+'-'+dateNtime.getDate();
        let time = dateNtime.getHours() + ":" + (dateNtime.getMinutes() === 0 ? '00' : dateNtime.getMinutes());
        data.date = date + ' ' + time;
        return data;
      })
      // Ongoing matches, probably SCHEDULEDs are good for this 
      let othermatches = matches.matches.filter((match: any) => {return match.status === "SCHEDULED"});
      this.otherMatches = othermatches.map((match:any) => {
        let data: Match = {homeTeam: '', awayTeam: '', date: {}, id: ''};
        data.awayTeam = match.awayTeam.name;
        data.homeTeam = match.homeTeam.name;
        let dateNtime = new Date(match.utcDate);
        let date = dateNtime.getFullYear()+'-'+(dateNtime.getMonth()+1)+'-'+dateNtime.getDate();
        let time = dateNtime.getHours() + ":" + (dateNtime.getMinutes() === 0 ? '00' : dateNtime.getMinutes());
        data.date = date + ' ' + time;
        data.id = match.id;
        return data;
      });
      this.isOngoingEmpty = this.otherMatches.length === 0;
      this.isLiveEmpty = this.liveMatches.length === 0;
    });
  }

  isLive(match: any) {
    return match.status === 'LIVE';
  }

  handleLiveOnClick() {
    this.showLiveMathes = true;
  }

  handleOtherOnClick() {
    this.showLiveMathes = false;
  }
}
