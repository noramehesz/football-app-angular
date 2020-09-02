import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompetitionsComponent } from './competitions/competitions.component';
import { SelectedCompetitionComponent } from './selected-competition/selected-competition.component';
import { MatchDetailsComponent } from './match-details/match-details.component';

const routes: Routes = [
  { path: '', component: CompetitionsComponent },
  { path: ':id', component: SelectedCompetitionComponent },
  { path: ':id/:id', component: MatchDetailsComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
