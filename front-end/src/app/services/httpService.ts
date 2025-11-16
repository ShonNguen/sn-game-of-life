import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  http = inject(HttpClient);

  getGeneratedGrid(rows: number, cols: number) {
    const url = `http://localhost:3000/grid?row=${rows}&col=${cols}`;
    return this.http.get<Array<Array<number>>>(url);
  }

  nextGeneration(currentGrid: number[][]) {
    const url = 'http://localhost:3000/next';
    return this.http.post<Array<Array<number>>>(url, { grid: currentGrid });
  }
}
