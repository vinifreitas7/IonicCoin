import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonSelect,
  IonSelectOption,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from '@ionic/angular/standalone';

import { CurrencyService } from '../services/currency.service';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonInput,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent
  ]
})
export class HomePage {

  amount = 1;
  fromCurrency = 'USD';
  toCurrency = 'BRL';
  result = 0;

  currencies = [
    'USD',
    'BRL',
    'EUR',
    'GBP',
    'JPY',
    'CAD',
    'AUD'
  ];

  constructor(
    private currencyService: CurrencyService,
    private storageService: StorageService
  ) {}

  convert() {
    this.currencyService.getRates(this.fromCurrency).subscribe({
      next: (data) => {

        console.log('BRL rate:', data.rates.BRL);
        console.log(data);

        const rate = data.rates[this.toCurrency];

        console.log('Amount:', this.amount);
        console.log('Rate:', rate);

        this.result = Number(this.amount) * Number(rate);

        console.log('Result:', this.result);

        this.storageService.saveConversion({
          amount: this.amount,
          from: this.fromCurrency,
          to: this.toCurrency,
          result: this.result,
          date: new Date()
        });

        localStorage.setItem(
          'lastRates',
          JSON.stringify(data.rates)
        );
      },

      error: () => {

        const rates = JSON.parse(
          localStorage.getItem('lastRates') || '{}'
        );

        const rate = rates[this.toCurrency];

        if (rate) {
          this.result = this.amount * rate;
        }
      }
    });
  }

  invertCurrencies() {
    const temp = this.fromCurrency;
    this.fromCurrency = this.toCurrency;
    this.toCurrency = temp;
  }
}