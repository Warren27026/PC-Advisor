import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroComponent } from './hero/hero.component';
import { ContactComponent } from './contact/contact.component';
import { AProposComponent } from './a-propos/a-propos.component';
import { CommencerComponent } from './commencer/commencer.component'; 
import { DebutantsComponent } from './commencer/debutants/debutants.component';
import { ConnaisseursComponent } from './commencer/connaisseurs/connaisseurs.component';
import { EducatifComponent } from './commencer/educatif/educatif.component';
const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'accueil', component: HeroComponent },
  { path: 'a-propos', component: AProposComponent },
  { path: 'contact', component: ContactComponent },
  { 
    path: 'commencer', 
    component: CommencerComponent,
    children: [
      { path: 'debutants', component: DebutantsComponent },
      { path: 'connaisseurs', component: ConnaisseursComponent },
      { path: 'educatif', component: EducatifComponent },
    ]
  },
  { path: '**', redirectTo: '/accueil' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}