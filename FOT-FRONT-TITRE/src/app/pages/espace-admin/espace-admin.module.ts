import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EspaceAdminRoutingModule } from './espace-admin-routing.module';
import { EspaceAdminComponent } from './espace-admin.component';
import { AddArticleComponent } from './add-article/add-article.component';
import { EditArticleComponent } from './edit-article/edit-article.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EspaceAdminComponent,
    AddArticleComponent,
    EditArticleComponent
  ],
  imports: [
    CommonModule,
    EspaceAdminRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ]
})
export class EspaceAdminModule { }
