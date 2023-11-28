import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from 'src/app/pages/articles/articles.component';
import { InscriptionComponent } from './pages/page-inscription/page-inscription.component';

import { HomeComponent } from 'src/app/pages/home/home.component';
import { ConnexionComponent } from './pages/page-connexion/page-connexion.component';
import { ErrorComponent } from './pages/favoris/error.component';
import { ArticleComponent } from './pages/article/article.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AdminGuard } from './guards/admin.guard';
import { authGuard } from './guards/auth.guard';
import { loggedInGuard } from './guards/logged-in.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'ma-collection',
    component: ArticlesComponent,
    title: "Collection"
  },
  {
    path: 'ma-collection/:id',
    component: ArticleComponent
  },
  {
    path: 'connexion',
    component: ConnexionComponent,
    title: "Connexion",
    canActivate: [loggedInGuard()]
  },
  {
    path: 'inscription',
    component: InscriptionComponent,
    title: "Inscription",
    canActivate: [loggedInGuard()]
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/espace-admin/espace-admin.module').then((m) => m.EspaceAdminModule),
    canActivate: [AdminGuard()]
  },
  {
    path: 'ma-liste',
    component: ErrorComponent,
    title: "Mes favoris",
    canActivate: [authGuard()]
  },
  {
    path: '404',
    component: NotFoundComponent,
    title: "404 Error"
  },
  {
    path: '**',
    redirectTo: '404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
