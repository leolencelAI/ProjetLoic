import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/Users';
import { Article } from 'src/app/models/articles';
import { ArticleService } from 'src/app/services/articles.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {

@Input() article: Article[]= [];
baseUrl : string = "http://localhost:3000/api/picture/";


constructor(private articleService:ArticleService){}

ngOnInit():void {

  this.articleService.getArticles().subscribe((articles) => {
    this.article = articles;
  });
}
}

