import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlesRoutingModule } from './articles-routing.module';
import { NewArticlePageComponent } from './pages/new-article-page/new-article-page.component';


@NgModule({
  declarations: [
    NewArticlePageComponent
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule
  ]
})
export class ArticlesModule { }
