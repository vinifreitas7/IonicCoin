import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-history',
  standalone: true,
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel
  ]
})
export class HistoryPage {

  history: any[] = [];

  ionViewWillEnter() {
    this.history = JSON.parse(
      localStorage.getItem('history') || '[]'
    );
  }
}