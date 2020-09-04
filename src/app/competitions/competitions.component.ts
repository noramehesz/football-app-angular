  import { Component, OnInit } from '@angular/core';
import { CompetitionsService } from '../competitions.service';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css'],
})
export class CompetitionsComponent implements OnInit {
  competitions;
  selectedCompetitionId: number;

  constructor(private competitionService: CompetitionsService) {}

  ngOnInit() {
      this.getCompetitions();
  }

  getCompetitions(): void {
    this.competitionService
      .getCompetitions()
      .subscribe((comps: any) => {
        this.competitions = comps.competitions; 
      });
  }

  handleCompetitionOnClick(id: number) {
    this.selectedCompetitionId = id;
  }
}
