import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompetitionsComponent } from './competitions/competitions.component';
import { SelectedCompetitionComponent } from './selected-competition/selected-competition.component';

const routes: Routes = [
  { path: '', redirectTo: ' /', pathMatch: 'full' },
  { path: ' /', component: CompetitionsComponent },
  { path: ':id', component: SelectedCompetitionComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
