import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmsService {
  private apiUrl = 'http://localhost:5000/api'; // Remplacez cette URL par l'URL de votre API

  constructor(private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/films`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Erreur du côté client
      console.error('Une erreur est survenue:', error.error.message);
    } else {
      // Erreur du côté serveur
      console.error(`Code d'erreur ${error.status}, ` + `Erreur: ${error.error}`);
    }
    // Retourne une observable avec un message d'erreur
    return throwError('Une erreur est survenue, veuillez réessayer plus tard.');
  }
  
}
