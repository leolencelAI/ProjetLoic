import { Component, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/articles.service';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Article } from 'src/app/models/articles';

@Component({
  selector: 'app-espace-admin',
  templateUrl: './espace-admin.component.html',
  styleUrls: ['./espace-admin.component.css'],
})
// espace-admin.component.ts

// Importez les dépendances nécessaires
export class EspaceAdminComponent implements OnInit {
  articles: Article[] = [];
  errorMsg!: string;
  selectedArticle: any = {};
  faBin = faTrash;
  faPencil = faPencil;
  baseUrl : string = "http://localhost:3000/api/picture/";

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  // Charger la liste des articles
  loadArticles(): void {
    this.articleService.getArticles().subscribe((data) => {
      this.articles = data;
    });
  }

  // Supprimer un article
  deleteArticle(articleId: number): void {
    this.articleService.deleteArticle(articleId).subscribe({
      next: () => {
        // Remove the deleted article from the articles array
        this.articles = this.articles.filter(article => article.id_article !== articleId);

      },
      error: (error: any) => {
        console.error('Erreur lors de la connexion:', error);
        this.errorMsg = "Échec de la suppression";
        this.cleanMessage();
      }
    });
  }

  private cleanMessage() {
    setTimeout(() => {
      this.errorMsg = '';
    }, 10000);
  }
}
