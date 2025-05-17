import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Computer } from '../../models/computer.model';

type UsageType = 'gaming' | 'work' | 'study' | 'media';
type BudgetType = 'low' | 'medium' | 'high';
type MobilityType = 'portable' | 'fixe';

interface Answers {
  usage: UsageType;
  budget: BudgetType;
  mobility: MobilityType | '';
}

interface Question {
  step: number;
  text: string;
  options: { value: string; label: string }[];
}

interface UsageRequirements {
  cpuScore: number;
  gpuScore: number;
  ram: number;
}

interface BudgetRange {
  min: number;
  max: number;
}

@Component({
  selector: 'app-debutants',
  templateUrl: './debutants.component.html',
  styleUrls: ['./debutants.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, HttpClientModule]
})
export class DebutantsComponent implements OnInit {
  currentStep = 1;
  answers: Answers = {
    usage: 'gaming',
    budget: 'low',
    mobility: ''
  };
  recommendation: Computer | null = null;
  computers: Computer[] = [];
  loadingError: string | null = null;

  questions: Question[] = [
    {
      step: 1,
      text: 'À quoi servira principalement votre PC ?',
      options: [
        { value: 'gaming', label: 'Jeux vidéo' },
        { value: 'work', label: 'Travail/Bureautique' },
        { value: 'study', label: 'Études' },
        { value: 'media', label: 'Multimedia (films, musique)' }
      ]
    },
    {
      step: 2,
      text: 'Quel est votre budget approximatif ?',
      options: [
        { value: 'low', label: 'Moins de 500 €' },
        { value: 'medium', label: '500-1000 €' },
        { value: 'high', label: 'Plus de 1000 €' }
      ]
    },
    {
      step: 3,
      text: 'Souhaitez-vous un PC portable ou fixe ?',
      options: [
        { value: 'portable', label: 'Portable' },
        { value: 'fixe', label: 'Fixe' }
      ]
    }
  ];

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log('ngOnInit exécuté - Début du chargement des données');
    console.log('Tentative de chargement de assets/computers.json');
    this.http.get<Computer[]>('assets/computers.json').subscribe({
      next: (data) => {
        console.log('Données reçues du serveur :', data);
        this.computers = data || [];
        console.log('Ordinateurs chargés :', this.computers.length, 'ordinateurs');
        console.log('Données brutes :', this.computers);
      },
      error: (err) => {
        console.error('Erreur lors du chargement de computers.json :', err);
        this.computers = [];
        this.loadingError = 'Erreur lors du chargement des données. Vérifiez que le fichier computers.json est présent dans src/assets.';
        console.log('Aucun ordinateur chargé, tableau vide.');
      },
      complete: () => {
        console.log('Chargement des données terminé.');
      }
    });
  }

  nextStep() {
    if (this.currentStep < this.questions.length) {
      this.currentStep++;
    } else {
      this.generateRecommendation();
    }
  }

  selectAnswer(step: number, value: string) {
    switch (step) {
      case 1: this.answers.usage = value as UsageType; break;
      case 2: this.answers.budget = value as BudgetType; break;
      case 3: this.answers.mobility = value as MobilityType; break;
    }
  }

  generateRecommendation() {
    console.log('=== Début de generateRecommendation ===');
    console.log('Réponses actuelles :', this.answers);
    console.log('Nombre d\'ordinateurs disponibles :', this.computers.length);

    const budgetRange: Record<BudgetType, BudgetRange> = {
      low: { min: 0, max: 500 },
      medium: { min: 500, max: 1000 },
      high: { min: 1000, max: Infinity }
    };

    const usageRequirements: Record<UsageType, UsageRequirements> = {
      gaming: { cpuScore: 10000, gpuScore: 4000, ram: 8 },
      work: { cpuScore: 4000, gpuScore: 395, ram: 8 },
      study: { cpuScore: 1000, gpuScore: 395, ram: 4 },
      media: { cpuScore: 4000, gpuScore: 1000, ram: 8 }
    };

    const filteredComputers = this.computers.filter(computer => {
      const matchesType = !this.answers.mobility || computer.type === this.answers.mobility;
      const matchesBudget =
        computer.prix >= budgetRange[this.answers.budget].min &&
        computer.prix <= budgetRange[this.answers.budget].max;
      const matchesUsage =
        computer.system.cpu.score >= usageRequirements[this.answers.usage].cpuScore &&
        computer.system.cg.score >= usageRequirements[this.answers.usage].gpuScore &&
        computer.system.ram >= usageRequirements[this.answers.usage].ram;

      console.log(`Vérification de ${computer.marque} ${computer.nom}:`, {
        matchesType,
        matchesBudget,
        matchesUsage,
        type: computer.type,
        prix: computer.prix,
        cpuScore: computer.system.cpu.score,
        gpuScore: computer.system.cg.score,
        ram: computer.system.ram,
        expectedType: this.answers.mobility,
        budgetRange: budgetRange[this.answers.budget],
        usageRequirements: usageRequirements[this.answers.usage]
      });

      return matchesType && matchesBudget && matchesUsage;
    });

    console.log('Ordinateurs filtrés :', filteredComputers.length);
    console.log('Détails des ordinateurs filtrés :', filteredComputers);

    if (filteredComputers.length > 0) {
      this.recommendation = filteredComputers.reduce((best, current) => {
        console.log(`Comparaison CPU : ${best.marque} ${best.nom} (${best.system.cpu.score}) vs ${current.marque} ${current.nom} (${current.system.cpu.score})`);
        return current.system.cpu.score > best.system.cpu.score ? current : best;
      });
      console.log('Recommandation sélectionnée :', this.recommendation);
    } else {
      this.recommendation = null;
      console.log('Aucune recommandation : aucun ordinateur ne correspond aux critères.');
    }

    this.cdr.detectChanges();
    this.currentStep++;
    console.log('Étape actuelle après recommandation :', this.currentStep);
    console.log('=== Fin de generateRecommendation ===');
  }

  reset() {
    this.currentStep = 1;
    this.answers = { usage: 'gaming', budget: 'low', mobility: '' };
    this.recommendation = null;
    console.log('Réinitialisation effectuée.');
    this.cdr.detectChanges();
  }

  isAnswerSelected(): boolean {
    switch (this.currentStep) {
      case 1: return true;
      case 2: return true;
      case 3: return this.answers.mobility !== '';
      default: return false;
    }
  }

  isOptionSelected(step: number, value: string): boolean {
    switch (step) {
      case 1: return this.answers.usage === value;
      case 2: return this.answers.budget === value;
      case 3: return this.answers.mobility === value;
      default: return false;
    }
  }
}