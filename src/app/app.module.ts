import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EnteteComponent } from './entete/entete.component';
import { HeroComponent } from './hero/hero.component';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { PieddepageComponent } from './pieddepage/pieddepage.component';
import { ContactComponent } from './contact/contact.component';
import { AProposComponent } from './a-propos/a-propos.component';
import { CommencerComponent } from './commencer/commencer.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
import { ConnaisseursComponent } from './commencer/connaisseurs/connaisseurs.component';
import { EducatifComponent } from './commencer/educatif/educatif.component';

@NgModule({
  declarations: [
    AppComponent,
    EnteteComponent,
    PieddepageComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    CommonModule, 
    AppRoutingModule,
    CarrouselComponent,
    ContactComponent,
    HeroComponent,
    AProposComponent,
    RecommendationComponent,
    CommencerComponent,
    EducatifComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }