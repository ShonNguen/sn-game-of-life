import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  http = inject(HttpClient);

  getGeneratedGrid() {
    const url = 'http://localhost:3000/grid?row=20&col=20';
    return this.http.get<Array<Array<number>>>(url);
  }

  nextGeneration(currentGrid: number[][]) {
    const url = 'http://localhost:3000/next';
    return this.http.post<Array<Array<number>>>(url, { grid: currentGrid });
  }
}
