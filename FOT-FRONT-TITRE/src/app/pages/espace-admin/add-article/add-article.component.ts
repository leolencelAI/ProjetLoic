import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, tap } from 'rxjs';
import { Category } from 'src/app/models/categorie';
import { ArticleService } from 'src/app/services/articles.service';
import { PictureService } from 'src/app/services/picture.service';
import { Article } from '../../../models/articles';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.css']
})
export class AddArticleComponent implements OnInit {
  articleForm!: FormGroup;
  errorMsg!: string;
  successMsg!: string;
  imagePreview!: string;
  categories: Category[] = [];

  constructor (private article: ArticleService,
                private picture: PictureService,
                private formBuilder: FormBuilder,) {}

  ngOnInit(): void {
    this.article.getCategories().subscribe((data) => {
      this.categories = data;
    });
    this.initEmptyForm();
  }

  initEmptyForm() {
    this.articleForm = this.formBuilder.group({
      titre: [null, Validators.required],
      year: [null, Validators.required],
      description: [null, Validators.required],
      image: [null, Validators.required],
      category: [null, Validators.required]
    });
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('monFichier', this.articleForm.get('image')!.value);
    this.picture.postImage(formData).subscribe({
      next: (response: any) => {
        const newArticle = new Article();
        newArticle.titre = this.articleForm.get('titre')!.value;
        newArticle.year = this.articleForm.get('year')!.value;
        newArticle.description = this.articleForm.get('description')!.value;
        newArticle.id_category = this.articleForm.get('category')!.value;
        newArticle.id_picture = response.id_picture;

        this.article.addArticle(newArticle).subscribe({
          next: () => {
            this.successMsg = "L'article a bien été créé!";
          },
          error: (error: any) => {
            this.errorMsg = "Erreur lors de la création de l'article: " + error.error.message;
          }
        });
      },
      error: (error: any) => {
        this.errorMsg = "Impossible d'enregistrer les images" + error.error.message;
      }
    });
  }

  onFileAdded(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.articleForm.get('image')!.setValue(file);
    this.articleForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
