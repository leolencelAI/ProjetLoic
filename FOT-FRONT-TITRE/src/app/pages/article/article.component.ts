import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { Article } from 'src/app/models/articles';
import { UserLog } from 'src/app/models/user-log';
import { ArticleService } from 'src/app/services/articles.service';
import { AuthService } from 'src/app/services/auth.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
})
export class ArticleComponent implements OnInit {
  article$!: Observable<Article>;
  isAuth$!: Observable<boolean>;
  baseUrl: string = 'http://localhost:3000/api/picture/';
  user!: UserLog;

  constructor(
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private titleService: Title,
    private userService: UsersService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isAuth$ = this.authService.isAuth$;
    this.authService.user$.subscribe((data) => (this.user = data));
    console.log('user', this.user); //a voir avec Louis

    this.route.params.pipe(
      map((params) => +params['id']), // Extract the 'id' parameter from the URL
      switchMap((articleId) => {
        this.article$ = this.articleService.getSingleArticle(articleId);
        return this.article$;
      }),
      map((article: Article) => article.titre) // Extracting the name of the article
    ).subscribe((articleName: string) => {
      this.titleService.setTitle(articleName); // Set the article name as the page title
    });
  }

  addFavorite(id_article: number) {
    const id_user = localStorage.getItem('id_user');
    this.userService.addFavorite(+id_user!, id_article).subscribe(
      {
        next: (response: any) => {
          this.router.navigate(['/ma-liste']);
        },
        error: (error: any) => {
          //A faire
        },
      }
    );
  }
}
