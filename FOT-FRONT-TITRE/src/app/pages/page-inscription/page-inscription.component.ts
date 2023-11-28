import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/Users';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-inscription',
  templateUrl: './page-inscription.component.html',
  styleUrls: ['./page-inscription.component.css'],
})
export class InscriptionComponent implements OnInit {
  addUser!: FormGroup;
  newUser!: User;
  errorMsg!: string;
  ShowPassword!: boolean;
  faEye = faEye;
  faEyeSlash = faEyeSlash;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    //Ici pas de type rôle car l'utilisateur ne doit pas pourvoir modifier cette variable | la création d'admin se fera directement dans la database
    this.addUser = this.formBuilder.group({
      firstname: new FormControl('', Validators.required),
      name: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  OnAddUser() {
    let newUser: User = { ...this.addUser.value };
    if (!this.addUser.valid) {
      newUser = { ...this.addUser.value };
    }
    //console.log(this.addUser);

    this.authService.inscription(newUser).subscribe({
      next: () => {
        this.addUser.reset();
        this.router.navigate(['/connexion']);
      },
      error: (error: any) => {
        this.errorMsg = "Erreur lors de l'ajout de l'utilisateur: " + error.error.message;
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
