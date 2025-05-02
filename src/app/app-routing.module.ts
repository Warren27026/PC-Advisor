import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroComponent } from './hero/hero.component';
import { ContactComponent } from './contact/contact.component';
import { AProposComponent } from './a-propos/a-propos.component'; // Importation du composant À Propos

const routes: Routes = [
  { path: '', redirectTo: '/accueil', pathMatch: 'full' },
  { path: 'accueil', component: HeroComponent },
  { path: 'a-propos', component: AProposComponent }, // Mise à jour de la route
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '/accueil' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}