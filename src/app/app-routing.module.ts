import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroComponent } from './hero/hero.component';
import { ContactComponent } from './contact/contact.component';
import { AProposComponent } from './a-propos/a-propos.component';
import { CommencerComponent } from './commencer/commencer.component'; // Importation du composant Commencer
import { DebutantsComponent } from './commencer/debutants/debutants.component';
const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'accueil', component: HeroComponent },
  { path: 'a-propos', component: AProposComponent },
  { path: 'contact', component: ContactComponent },
  { 
    path: 'commencer', 
    component: CommencerComponent,
    children: [
      { path: 'debutants', component: DebutantsComponent }
    ]
  },
  { path: '**', redirectTo: '/accueil' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}