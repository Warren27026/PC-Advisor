import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class ContactComponent {
  // Modèle pour les données du formulaire
  contactForm = {
    nom: '',
    email: '',
    sujet: '',
    message: ''
  };

  // Méthode pour soumettre le formulaire
  soumettreFormulaire() {
    console.log('Formulaire soumis :', this.contactForm);
    alert('Merci pour votre message ! Nous vous répondrons bientôt.');
    // Réinitialiser le formulaire
    this.contactForm = { nom: '', email: '', sujet: '', message: '' };
  }
}