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
    CommencerComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }