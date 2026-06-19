import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  saveConversion(data: any) {
    let history = JSON.parse(localStorage.getItem('history') || '[]');

    history.unshift(data);

    localStorage.setItem(
      'history',
      JSON.stringify(history)
    );
  }

  getHistory() {
    return JSON.parse(
      localStorage.getItem('history') || '[]'
    );
  }
}