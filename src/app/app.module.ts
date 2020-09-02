import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompetitionsComponent } from './competitions/competitions.component';
import { SelectedCompetitionComponent } from './selected-competition/selected-competition.component';
import { MatchDetailsComponent } from './match-details/match-details.component';

@NgModule({
  declarations: [
    AppComponent,
    CompetitionsComponent,
    SelectedCompetitionComponent,
    MatchDetailsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
