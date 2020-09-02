  import { Component, OnInit } from '@angular/core';
import { CompetitionsService } from '../competitions.service';
import { ShareCompetitionsService } from '../share-competitions.service';

@Component({
  selector: 'app-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.css'],
})
export class CompetitionsComponent implements OnInit {
  competitions;
  selectedCompetitionId: number;

  constructor(private competitionService: CompetitionsService, private shareData: ShareCompetitionsService) {}

  ngOnInit() {
    if (!this.shareData.getCompetitions()) {
      this.getCompetitions();
    } else {
      this.competitions = this.shareData.getCompetitions();
    }
  }

  getCompetitions(): void {
    this.competitionService
      .getCompetitions()
      .subscribe((comps: any) => {
        this.competitions = comps.competitions; 
        this.shareData.setCompetitions(comps.competitions)
      });
  }

  handleCompetitionOnClick(id: number) {
    this.selectedCompetitionId = id;
    console.log(`selected com id : ${id}`);
  }
}
