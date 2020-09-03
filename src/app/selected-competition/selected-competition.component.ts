import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompetitionsService } from '../competitions.service';
import { ShareCompetitionsService } from '../share-competitions.service';

@Component({
  selector: 'app-selected-competition',
  templateUrl: './selected-competition.component.html',
  styleUrls: ['./selected-competition.component.css'],
})
export class SelectedCompetitionComponent implements OnInit {
  matches;
  competitionName: string;
  showLiveMathes: boolean = true;
  liveMatches;
  otherMatches;

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
      console.log(comps.competitions);
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
      this.liveMatches = matches.matches.filter((match: any) => {return match.match.status === "LIVE"});
      this.otherMatches = matches.matches.filter((match: any) => {return match.match.status !== "LIVE"});
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
