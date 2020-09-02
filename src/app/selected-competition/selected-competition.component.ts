import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompetitionsService } from '../competitions.service';

@Component({
  selector: 'app-selected-competition',
  templateUrl: './selected-competition.component.html',
  styleUrls: ['./selected-competition.component.css'],
})
export class SelectedCompetitionComponent implements OnInit {
  @Input() selectedCompetitionId: number;
  competition;

  constructor(
    private route: ActivatedRoute,
    private competitionService: CompetitionsService
  ) {}

  ngOnInit() {
    this.getCompetition(this.selectedCompetitionId);
  }

  getCompetition(id: number) {
    this.competitionService.getCompetitionById(id).subscribe((comp: any) => {
      this.competition = comp;
      console.log(comp);
    });
  }
}
