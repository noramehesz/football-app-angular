import { Injectable } from '@angular/core';
import { CompetitionsService } from './competitions.service';

@Injectable({
  providedIn: 'root'
})
export class ShareCompetitionsService {
  competitions;

  constructor(
  ) { }

  setCompetitions(comps: any) {
    this.competitions = comps;
    console.log("set competitions")
  }

  getCompetitions() {
    if (this.competitions) {
      return this.competitions;
    }
  }
}
