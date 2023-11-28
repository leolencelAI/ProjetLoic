import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/articles';
import { Favoris } from '../models/favoris';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'http://localhost:3000/api';
  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders{
    const token = localStorage.getItem('token')
    let headers = new HttpHeaders();
    if(token){
      headers = headers.set('Authorization', 'Bearer ' + token)
    }
    return headers;
  }

  addFavorite(id_users: number, id_article: number) {
    const body = {};
    // console.log('coucou');
    return this.http.post(
      `${this.apiUrl}/user/${id_users}/favorites/${id_article}`,
      body, {headers: this.getHeaders()}
    );
  }

  getFavoritesByUser(id_users: number): Observable<Favoris[]> {
    return this.http.get<Favoris[]>(`${this.apiUrl}/user/${id_users}/favorites`, {headers: this.getHeaders()});
  }

  deleteFavoris(favorisId: number, id_users:number){
    return this.http.delete(`${this.apiUrl}/user/${id_users}/favorites/${favorisId}`, {headers: this.getHeaders()});
  }
}
