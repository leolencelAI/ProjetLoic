import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EspaceAdminComponent } from './espace-admin.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { AddArticleComponent } from './add-article/add-article.component';

const routes: Routes = [
  {
    path: '',
    component: EspaceAdminComponent,
    title: "Admin"
  },
  {
    path: 'edit/:id',
    component: EditArticleComponent,
    title: "Edition article"
  },
  {
    path: 'newArticle',
    component: AddArticleComponent,
    title: "Ajout article"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EspaceAdminRoutingModule { }
