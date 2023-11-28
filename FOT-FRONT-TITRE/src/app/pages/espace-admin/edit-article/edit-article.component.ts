import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, tap, Observable } from 'rxjs';
import { Category } from 'src/app/models/categorie';
import { ArticleService } from 'src/app/services/articles.service';
import { PictureService } from 'src/app/services/picture.service';
import { Article } from '../../../models/articles';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css'],
})
export class EditArticleComponent {
  modifyArticleForm!: FormGroup;
  article$!: Observable<Article>;
  article!: Article;
  loading!: boolean;
  errorMsg!: string;
  successMsg!: string;
  imagePreview!: string;
  categories: Category[] = [];
  baseUrl: string = 'http://localhost:3000/api/picture/';

  constructor(
    private articleService: ArticleService,
    private picture: PictureService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.route.params.subscribe((params) => {
      const articleId = +params['id']; // Extract the 'id' parameter from the URL
      this.article$ = this.articleService.getSingleArticle(articleId);

      // Subscribe to the observable and assign the emitted value to this.article
      this.article$.subscribe((article: Article) => {
        this.article = article;
        this.initModifyForm();
        this.loading = false;
      });
    });

    this.articleService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  initModifyForm() {
    this.modifyArticleForm = this.formBuilder.group({
      titre: [this?.article?.titre, Validators.required],
      year: [this?.article?.year, Validators.required],
      description: [this?.article?.description, Validators.required],
      image: [this?.article?.id_picture, Validators.required],
      category: [this?.article?.id_category, Validators.required],
    });
    this.imagePreview = this.baseUrl + this.article.id_picture;
  }

  onSubmit() {
    console.log(this.modifyArticleForm.get('image')!.value);
    if (typeof this.modifyArticleForm.get('image')!.value === 'number') {
      const newArticle = new Article();
      newArticle.titre = this.modifyArticleForm.get('titre')!.value;
      newArticle.year = this.modifyArticleForm.get('year')!.value;
      newArticle.description = this.modifyArticleForm.get('description')!.value;
      newArticle.id_category = this.modifyArticleForm.get('category')!.value;
      newArticle.id_picture = this.modifyArticleForm.get('image')!.value;

      this.articleService
        .updateArticle(this.article.id_article, newArticle)
        .subscribe({
          next: () => {
            this.successMsg = "L'article a bien été modifié!";
          },
          error: (error: any) => {
            this.errorMsg =
              "Erreur lors de la création de l'article: " + error.error.message;
          },
        });
    } else {
      const formData = new FormData();
      formData.append('monFichier', this.modifyArticleForm.get('image')!.value);
      this.picture.postImage(formData).subscribe({
        next: (response: any) => {
          const newArticle = new Article();
          newArticle.titre = this.modifyArticleForm.get('titre')!.value;
          newArticle.year = this.modifyArticleForm.get('year')!.value;
          newArticle.description =
            this.modifyArticleForm.get('description')!.value;
          newArticle.id_category =
            this.modifyArticleForm.get('category')!.value;
          newArticle.id_picture = response.id_picture;
          console.log(response.id_picture);

          this.articleService
            .updateArticle(this.article.id_article, newArticle)
            .subscribe({
              next: () => {
                this.successMsg = "L'article a bien été modifié!";
                this.picture.deletePhotos(this.article.id_picture).subscribe({
                  error: (error: any) => {
                    this.errorMsg =
                      'Problème lors de a suppression de la photo précédente' +
                      error.error.message;
                  },
                });
              },
              error: (error: any) => {
                this.errorMsg =
                  "Erreur lors de la création de l'article: " +
                  error.error.message;
              },
            });
        },
        error: (error: any) => {
          this.errorMsg =
            "Impossible d'enregistrer les images" + error.error.message;
        },
      });
    }
  }

  onFileAdded(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.modifyArticleForm.get('image')!.setValue(file);
    this.modifyArticleForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
