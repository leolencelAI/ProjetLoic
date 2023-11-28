import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/models/articles';
import { Category } from 'src/app/models/categorie';
import { ArticleService } from 'src/app/services/articles.service';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css'],
})
export class ArticlesComponent implements OnInit {
  articles: Article[] | undefined;
  allArticles!: Article[];
  articlesFilter: Article[] = [];
  articleCategory!: Category[];
  allCategories!: Category[];
  categorieToDisplay: string[] = [];
  categorieChecked!: number[];

  constructor(
    private articleService: ArticleService,
    private CategoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.articleService.getArticles().subscribe({
      next:(response)=>{
      this.allArticles = response;
      this.articlesFilter = [...this.allArticles];
    },
    error: (error: any) => {
      console.error('Erreur lors de la récupération des articles:', error);
    },
  });

    this.CategoryService.getCategorie().subscribe({
      next: (response) => {
        this.allCategories = [...response];
      },
    });
  }

  aLecouteDeLenfant(categoryEnvoiParents:number[]){
    this.categorieChecked = categoryEnvoiParents;
    this.onUserInteractionFiltre();
  }

  onUserInteractionFiltre(){
    if(this.allCategories.length === this.categorieChecked.length || this.categorieChecked.length === 0){
      this.articlesFilter=[...this.allArticles];
    }else{
      this.articlesFilter=this.allArticles.filter((e)=>this.categorieChecked.includes(e.id_category))
    }
    }
  }



