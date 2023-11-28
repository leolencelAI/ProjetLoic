import { HttpClient } from '@angular/common/http';
// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { UserLog } from '../models/user-log';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuth$ = new BehaviorSubject<boolean>(false);
  public admin$ = new BehaviorSubject<boolean>(false);
  public user$ = new Subject<UserLog>();

  constructor(private http: HttpClient, private router: Router) {}

  connexion(emailParam: string, passwordParam: string) {
    interface ApiResponse {
      accessToken: string;
      admin: boolean;
      user: UserLog; // créer un modèle à la place du any ici
    }

    return this.http.post<ApiResponse>(`http://localhost:3000/api/auth/login`, { email: emailParam, password: passwordParam }).pipe(
      tap((res: ApiResponse) => {
        if (res.accessToken) {
          localStorage.setItem('token', res.accessToken);
          localStorage.setItem('id_user', res.user.id_users.toString())
        }
        this.isAuth$.next(true);
        this.admin$.next(res.admin);
        this.user$.next(res.user);
        return res;
      }));
  }

  inscription(data: {
    firstname: string;
    name: string;
    password: string;
    email: string;
  }) {
    return this.http.post(`http://localhost:3000/api/auth/register`, data);
  }

  logout() {
    //deconnexion
    localStorage.removeItem('token');
    this.router.navigate(['/connexion']);
    this.isAuth$.next(false);
  }
}
