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

  // Propriété pour gérer l'affichage du message de confirmation
  showSuccessMessage: boolean = false;
  successMessage: string = '';

  // Méthode pour soumettre le formulaire
  soumettreFormulaire() {
    console.log('Formulaire soumis :', this.contactForm);
    
    // Afficher le message de confirmation
    this.successMessage = `Merci ${this.contactForm.nom || 'pour votre message'} ! Votre message a été envoyé avec succès. Nous vous répondrons bientôt à ${this.contactForm.email}.`;
    this.showSuccessMessage = true;

    // Réinitialiser le formulaire
    this.contactForm = { nom: '', email: '', sujet: '', message: '' };

    // Masquer le message après 5 secondes
    setTimeout(() => {
      this.showSuccessMessage = false;
    }, 5000);
  }
}