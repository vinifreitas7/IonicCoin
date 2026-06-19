import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private apiUrl = 'https://open.er-api.com/v6/latest';

  constructor(private http: HttpClient) {}

  getRates(base: string) {
    return this.http.get<any>(`${this.apiUrl}/${base}`);
  }
}