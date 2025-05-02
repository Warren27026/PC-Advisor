import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ElementCarrousel {
  titre: string;
  description: string;
  image: string;
  lien: string;
}

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class CarrouselComponent implements OnInit, AfterViewInit {
  elements: ElementCarrousel[] = [
    {
      titre: 'PC Gamer Elite',
      description: 'Un PC puissant avec GPU NVIDIA RTX 3080, parfait pour les jeux AAA et le streaming.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80', // PC gaming setup
      lien: 'https://example.com/pc-gamer'
    },
    {
      titre: 'PC Portable Ultralight',
      description: 'Léger (1.2 kg) avec écran 14" Full HD, idéal pour les étudiants.',
      image: 'https://images.unsplash.com/photo-1593642532400-2682810df593?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80', // Laptop on desk
      lien: 'https://example.com/pc-portable'
    },
    {
      titre: 'PC Bureautique Pro',
      description: 'Optimisé avec 16Go de RAM et Intel i5 pour le multitâche.',
      image: 'https://i.pinimg.com/736x/78/87/f5/7887f5fe42811a7df7ea108bc1fe65b4.jpg', // Office desktop
      lien: 'https://example.com/pc-bureautique'
    },
    {
      titre: 'Workstation Créative',
      description: 'Conçu pour la vidéo et le design avec GPU Quadro et 32Go RAM.',
      image: 'https://i.pinimg.com/736x/54/c9/be/54c9be7f41cd3a862bf8334da009d5db.jpg', // Creative workstation
      lien: 'https://example.com/workstation'
    },
    {
      titre: 'Mini PC Compact',
      description: 'Petit mais puissant, idéal pour les petits espaces.',
      image: 'https://i.pinimg.com/736x/b2/aa/81/b2aa8126e0fb009c4aa8e14f27501abd.jpg', // Mini PC setup
      lien: 'https://example.com/mini-pc'
    },
    {
      titre: 'PC Gaming Budget',
      description: 'Performance abordable avec GPU GTX 1660 pour les joueurs novices.',
      image: 'https://i.pinimg.com/736x/d3/47/f5/d347f562779ba7f8945ba0f04adda099.jpg', // Budget gaming PC
      lien: 'https://example.com/pc-budget'
    }
  ];

  @ViewChild('carrouselContenu') carrouselContenu!: ElementRef;
  indexActuel: number = 0;
  scrollPerItem: number = 420; // Largeur d'une carte + marge

  constructor() { }

  ngOnInit(): void {
    this.startAutoScroll();
  }

  ngAfterViewInit(): void {
    this.scrollToIndex(this.indexActuel);
  }

  startAutoScroll(): void {
    setInterval(() => {
      this.suivant();
    }, 5000);
  }

  scrollToIndex(index: number): void {
    this.indexActuel = index;
    this.carrouselContenu.nativeElement.scrollTo({
      left: index * this.scrollPerItem,
      behavior: 'smooth'
    });
  }

  suivant(): void {
    const maxIndex = Math.floor(this.carrouselContenu.nativeElement.scrollWidth / this.scrollPerItem) - 1;
    this.indexActuel = (this.indexActuel + 1) > maxIndex ? 0 : this.indexActuel + 1;
    this.scrollToIndex(this.indexActuel);
  }

  precedent(): void {
    this.indexActuel = (this.indexActuel - 1) < 0 ? Math.floor(this.elements.length / 2) : this.indexActuel - 1;
    this.scrollToIndex(this.indexActuel);
  }

  allerA(index: number): void {
    this.indexActuel = index;
    this.scrollToIndex(this.indexActuel);
  }
}