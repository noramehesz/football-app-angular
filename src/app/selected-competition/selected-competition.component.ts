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

  constructor(
    private route: ActivatedRoute,
    private competitionService: CompetitionsService,
    private shareData: ShareCompetitionsService,
  ) {}

  ngOnInit() {
    let league: string = this.route.snapshot.paramMap.get('id');
    this.competitionName = league.replace(/\s/g, '');
    let id: number = this.shareData.getCompetitions().filter(comp => {
      return comp.name === league;
    })[0].id as number;
    console.log(id);
    this.getMatches(id);
  }

  getMatches(competitionId: number) {
    this.competitionService.getMatchesForCompetition(competitionId).subscribe((matches: any) => {
      this.matches = matches;
    });
  }

  isLive(match: any) {
    return match.status === 'LIVE';
  }
}
