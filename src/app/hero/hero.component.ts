import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarrouselComponent } from '../carrousel/carrousel.component';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, CarrouselComponent]
})
export class HeroComponent {}