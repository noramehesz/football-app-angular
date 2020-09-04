import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompetitionsService } from '../competitions.service';
import { ShareCompetitionsService } from '../share-competitions.service';

interface Match {
  homeTeam: string;
  awayTeam: string;
  date: any;
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
  liveMatches: [];
  otherMatches: Match[] = [];
  isLiveEmpty: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private competitionService: CompetitionsService,
    private shareData: ShareCompetitionsService,
  ) {}

  ngOnInit() {
    let league: string = this.route.snapshot.paramMap.get('competition');
    console.log(league);
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
      console.log(matches);
      // Live matches, which status can be LIVE or IN_PLAY
      this.liveMatches = matches.matches.filter((match: any) => {return match.status === "LIVE" || match.status === "IN_PLAY"});
      // Ongoing matches, probably SCHEDULEDs are good for this 
      let othermatches = matches.matches.filter((match: any) => {return match.status === "SCHEDULED"});
      this.otherMatches = othermatches.map((match:any) => {
        let data: Match = {homeTeam: '', awayTeam: '', date: {}};
        data.awayTeam = match.awayTeam.name;
        data.homeTeam = match.homeTeam.name;
        data.date = match.utcDate;
        return data;
      });
      console.log(this.otherMatches);
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
