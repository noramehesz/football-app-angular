import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompetitionsService } from '../competitions.service';

@Component({
  selector: 'app-selected-competition',
  templateUrl: './selected-competition.component.html',
  styleUrls: ['./selected-competition.component.css'],
})
export class SelectedCompetitionComponent implements OnInit {
  selectedCompetition;

  constructor(
    private route: ActivatedRoute,
    private competitionService: CompetitionsService,
    private location: Location
  ) {}

  ngOnInit() {}
}
