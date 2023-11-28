import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { InscriptionComponent } from './pages/page-inscription/page-inscription.component';
import { ConnexionComponent } from './pages/page-connexion/page-connexion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ArticlesComponent } from './pages/articles/articles.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CardComponent } from './components/card/card.component';
import { ErrorComponent } from './pages/favoris/error.component';
import { FooterComponent } from './footer/footer.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FilterBarComponent } from './components/filter-bar/filter-bar.component';

import { ArticleComponent } from './pages/article/article.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthInterceptorService } from './services/auth-interceptor.service.spec';
import { ResponsiveMenuComponent } from './components/responsive-menu/responsive-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    InscriptionComponent,
    ConnexionComponent,
    ArticlesComponent,
    CarouselComponent,
    CardComponent,
    ErrorComponent,
    FooterComponent,
    FilterBarComponent,
    FooterComponent,
    ArticleComponent,
    NotFoundComponent,
    ResponsiveMenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}],
  bootstrap: [AppComponent],
})
export class AppModule {}
