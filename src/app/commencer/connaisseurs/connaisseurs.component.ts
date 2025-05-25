import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Computer } from '../../models/computer.models';
import { RecommendationComponent } from '../../recommendation/recommendation.component';
import computersData from '../../../assets/computers.json';

type CpuModel = 'Intel X9' | 'Intel X7' | 'Intel X5' | 'Intel X3' | 'AMD B9' | 'AMD B7' | 'AMD B5' | 'AMD B3' | 'Intel ATAUM' | string;
type GpuModel = 'RTZ 3080' | 'RTZ 3060' | 'RTZ 3050' | 'RTZ 3030' | 'mtx 350' | 'HD IRIS' | 'HD 9000' | string;
type StorageType = 'NVMe' | 'SSD' | 'HDD' | 'MMC';

interface Answers {
  cpuModel: CpuModel | '';
  gpuModel: GpuModel | '';
  ram: number | '';
  storageType: StorageType | '';
  budget: number | '';
}

interface Question {
  step: number;
  text: string;
  options: { value: string | number; label: string }[];
}

@Component({
  selector: 'app-conaisseurs',
  templateUrl: './connaisseurs.component.html',
  styleUrls: ['./connaisseurs.component.css'],
  standalone: true,
  imports: [CommonModule, RouterModule, RecommendationComponent]
})
export class ConnaisseursComponent implements OnInit {
  currentStep = 1;
  answers: Answers = {
    cpuModel: '',
    gpuModel: '',
    ram: '',
    storageType: '',
    budget: ''
  };
  recommendation: Computer[] | null = null;
  computers: Computer[] = [];
  loadingError: string | null = null;

  questions: Question[] = [
    {
      step: 1,
      text: 'Quel modèle de CPU préférez-vous ?',
      options: [
        { value: 'Intel X9', label: 'Intel X9' },
        { value: 'Intel X7', label: 'Intel X7' },
        { value: 'Intel X5', label: 'Intel X5' },
        { value: 'Intel X3', label: 'Intel X3' },
        { value: 'AMD B9', label: 'AMD B9' },
        { value: 'AMD B7', label: 'AMD B7' },
        { value: 'AMD B5', label: 'AMD B5' },
        { value: 'AMD B3', label: 'AMD B3' },
        { value: 'Intel ATAUM', label: 'Intel ATAUM' }
      ]
    },
    {
      step: 2,
      text: 'Quel modèle de GPU préférez-vous ?',
      options: [
        { value: 'RTZ 3080', label: 'RTZ 3080' },
        { value: 'RTZ 3060', label: 'RTZ 3060' },
        { value: 'RTZ 3050', label: 'RTZ 3050' },
        { value: 'RTZ 3030', label: 'RTZ 3030' },
        { value: 'mtx 350', label: 'mtx 350' },
        { value: 'HD IRIS', label: 'HD IRIS' },
        { value: 'HD 9000', label: 'HD 9000' }
      ]
    },
    {
      step: 3,
      text: 'Quelle quantité de RAM (en Go) ?',
      options: [
        { value: 4, label: '4 Go' },
        { value: 8, label: '8 Go' },
        { value: 16, label: '16 Go' },
        { value: 32, label: '32 Go' }
      ]
    },
    {
      step: 4,
      text: 'Quel type de stockage préférez-vous ?',
      options: [
        { value: 'NVMe', label: 'NVMe' },
        { value: 'SSD', label: 'SSD' },
        { value: 'HDD', label: 'HDD' },
        { value: 'MMC', label: 'MMC' }
      ]
    },
    {
      step: 5,
      text: 'Quel est votre budget maximum (en €) ?',
      options: [
        { value: 500, label: '500 €' },
        { value: 1000, label: '1000 €' },
        { value: 1500, label: '1500 €' },
        { value: 2000, label: '2000 €' }
      ]
    }
  ];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    console.log('ngOnInit exécuté - Chargement des données depuis computers.json');
    try {
      this.computers = computersData as Computer[];
      console.log('Données brutes :', this.computers);
      console.log('Ordinateurs chargés :', this.computers.length, 'ordinateurs');
      console.log('Données brutes :', this.computers);
      if (!this.computers || this.computers.length === 0) {
        this.loadingError = 'Aucune donnée trouvée dans computers.json.';
      }
    } catch (err) {
      console.error('Erreur lors du chargement de computers.json :', err);
      this.computers = [];
      this.loadingError = 'Erreur lors du chargement des données. Vérifiez que le fichier computers.json est correctement formaté.';
      console.log('Aucun ordinateur chargé, tableau vide.');
    }
  }

  nextStep() {
    if (this.currentStep < this.questions.length) {
      this.currentStep++;
    } else {
      this.generateRecommendation();
    }
  }

  selectAnswer(step: number, value: string | number) {
    switch (step) {
      case 1: this.answers.cpuModel = value as CpuModel; break;
      case 2: this.answers.gpuModel = value as GpuModel; break;
      case 3: this.answers.ram = Number(value); break;
      case 4: this.answers.storageType = value as StorageType; break;
      case 5: this.answers.budget = Number(value); break;
    }
  }

generateRecommendation() {//Log utliser pour debuger le site notamment dans la recommandation 
  console.log('=== Début de generateRecommendation ===');
  console.log('Réponses actuelles :', this.answers);
  console.log('Nombre d\'ordinateurs disponibles :', this.computers.length);

  const filteredComputers = this.computers.filter(computer => {
    let cpuMatchString = '';
    if (computer.system.cpu.nom.includes('X9')) cpuMatchString = 'Intel X9';
    else if (computer.system.cpu.nom.includes('X7')) cpuMatchString = 'Intel X7';
    else if (computer.system.cpu.nom.includes('X5')) cpuMatchString = 'Intel X5';
    else if (computer.system.cpu.nom.includes('X3')) cpuMatchString = 'Intel X3';
    else if (computer.system.cpu.nom.includes('B9')) cpuMatchString = 'AMD B9';
    else if (computer.system.cpu.nom.includes('B7')) cpuMatchString = 'AMD B7';
    else if (computer.system.cpu.nom.includes('B5')) cpuMatchString = 'AMD B5';
    else if (computer.system.cpu.nom.includes('B3')) cpuMatchString = 'AMD B3';
    else if (computer.system.cpu.nom.includes('ATAUM')) cpuMatchString = 'Intel ATAUM';

    const matchesCpu = !this.answers.cpuModel || cpuMatchString === this.answers.cpuModel;
    const matchesGpu = !this.answers.gpuModel || computer.system.cg.modele.includes(this.answers.gpuModel || '');
    const matchesRam = !this.answers.ram || Math.abs(computer.system.ram - this.answers.ram) <= 8; // Tolérance de ±8 Go
    const matchesStorage = !this.answers.storageType || this.checkStorage(computer, this.answers.storageType);
    const matchesBudget = !this.answers.budget || computer.prix <= this.answers.budget;

    console.log(`Vérification de ${computer.marque} ${computer.nom}:`, {
      matchesCpu,
      matchesGpu,
      matchesRam,
      matchesStorage,
      matchesBudget,
      cpu: computer.system.cpu.nom,
      cpuMatchString,
      gpu: computer.system.cg.modele,
      ram: computer.system.ram,
      storage: computer.system.hdd ? computer.system.hdd.type : 'N/A',
      prix: computer.prix,
      answers: this.answers
    });

    // Accepter si au moins 4 critères sur 5 sont remplis
    const matchCount = [matchesCpu, matchesGpu, matchesRam, matchesStorage, matchesBudget].filter(Boolean).length;
    return matchCount >= 4;
  });

  console.log('Ordinateurs filtrés :', filteredComputers.length);
  console.log('Détails des ordinateurs filtrés :', filteredComputers);

  if (filteredComputers.length > 0) {
    this.recommendation = filteredComputers.slice(0, 3);
    console.log('Recommandations sélectionnées :', this.recommendation);
  } else {
    this.recommendation = null;
    console.log('Aucune recommandation : aucun ordinateur ne correspond aux critères.');
  }

  this.cdr.detectChanges();
  this.currentStep++;
  console.log('Étape actuelle après recommandation :', this.currentStep);
  console.log('=== Fin de generateRecommendation ===');
}

  private checkStorage(computer: Computer, storageType: StorageType): boolean {
    if (!computer.system.hdd) return false;
    const normalizedHddType = computer.system.hdd.type.toLowerCase();
    const normalizedStorageType = storageType.toLowerCase();
    console.log(`Comparaison stockage : ${normalizedHddType} === ${normalizedStorageType}`);
    return normalizedHddType === normalizedStorageType;
  }

  reset() {
    this.currentStep = 1;
    this.answers = { cpuModel: '', gpuModel: '', ram: '', storageType: '', budget: '' };
    this.recommendation = null;
    console.log('Réinitialisation effectuée.');
    this.cdr.detectChanges();
  }

  isAnswerSelected(): boolean {
    switch (this.currentStep) {
      case 1: return !!this.answers.cpuModel;
      case 2: return !!this.answers.gpuModel;
      case 3: return !!this.answers.ram;
      case 4: return !!this.answers.storageType;
      case 5: return !!this.answers.budget;
      default: return false;
    }
  }

  isOptionSelected(step: number, value: string | number): boolean {
    switch (step) {
      case 1: return this.answers.cpuModel === value;
      case 2: return this.answers.gpuModel === value;
      case 3: return this.answers.ram === value;
      case 4: return this.answers.storageType === value;
      case 5: return this.answers.budget === value;
      default: return false;
    }
  }
}