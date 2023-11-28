import { Component } from '@angular/core';
import { Article } from 'src/app/models/articles';
import { UsersService } from 'src/app/services/users.service';
import { NgZone } from '@angular/core';
import { Favoris } from 'src/app/models/favoris';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
})
export class ErrorComponent {
 articlesFavori!: Favoris[];
 messageInfo!: string;
 msgSuccess!: string;
 msgError!: string;
 faBin = faTrash;
 id_user = +localStorage.getItem('id_user')!;
 baseUrl: string = 'http://localhost:3000/api/picture/';
  constructor(private userService: UsersService) {}

  ngOnInit() {
    this.loadFavoris();
  }

  loadFavoris(){
    this.userService.getFavoritesByUser(this.id_user).subscribe({
      next: (favoris: Favoris[])=>{
        this.articlesFavori = favoris
        console.log(this.articlesFavori)
        if(this.articlesFavori.length == 0) {
          this.messageInfo = "Aucun favoris";
        }
      }, error: error =>{
        this.messageInfo = "Erreur lors de la récupération des favoris";
      }
     }
     )
  }

  removeFavoris(favorisId: number){
    this.userService.deleteFavoris(favorisId, this.id_user).subscribe({
      next: ()=>{
        this.articlesFavori = this.articlesFavori.filter(favori => favori.id_article !== favorisId)
        if(this.articlesFavori.length == 0) {
          this.messageInfo = "Aucun favoris";
        }
        this.msgSuccess = "Suppression ✔️";
      }, error: error =>{
        this.msgError = "Erreur lors de la suppression ❌";
      }
    })
  }
}
