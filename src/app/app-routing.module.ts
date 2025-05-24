import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroComponent } from './hero/hero.component';
import { ContactComponent } from './contact/contact.component';
import { AProposComponent } from './a-propos/a-propos.component';
<<<<<<< HEAD
import { CommencerComponent } from './commencer/commencer.component'; // Importation du composant Commencer
import { DebutantsComponent } from './commencer/debutants/debutants.component';
=======
import { CommencerComponent } from './commencer/commencer.component';
import { DebutantsComponent } from './commencer/debutants/debutants.component';

>>>>>>> 6160f84ec9276f452bf63a758a4d8a4ea7c1b791
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