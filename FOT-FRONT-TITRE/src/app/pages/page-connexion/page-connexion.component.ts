import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-connexion',
  templateUrl: './page-connexion.component.html',
  styleUrls: ['./page-connexion.component.css'],
})
export class ConnexionComponent implements OnInit {
  connexion!: FormGroup;
  errorMsg!: string;
  ShowPassword!: boolean;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  constructor(
    private userService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    if (localStorage.getItem('access_token')) {
      this.router.navigate(['/admin']);
    }

    //L'initialisation du form doit être fait dans la fct onint dédiée
    //Le mieux est de demander l'email pour la connexion
    this.connexion = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  OnConnect() {
    //Garde le même nommage à travers tes composants userService != Authservice
    //Attention, on ne peux souscrire à l' Observable qu'une fois
    this.userService
      .connexion(this.connexion.value.email, this.connexion.value.password)
      .subscribe({
        next: (response: any) => {
          if (response && response.accessToken) {
            if (response.admin) {
              this.router.navigate(['/admin']);
            } else {
              this.router.navigate(['/home']);
            }
          } else {
            console.error('Token non reçu dans la réponse.');
            this.errorMsg = 'Token non reçu dans la réponse';
            this.cleanMessage();
          }
        },
        error: (error: any) => {
          console.error('Erreur lors de la connexion:', error);
          this.errorMsg = error.error.message;
          this.cleanMessage();
        },
      });
  }

  private cleanMessage() {
    setTimeout(() => {
      this.errorMsg = '';
    }, 10000);
  }
}
