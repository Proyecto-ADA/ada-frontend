import { MaterialModule } from './../material/material.module'
import { ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AngularEditorModule } from '@kolkov/angular-editor'

import { ArticlesRoutingModule } from './articles-routing.module'
import { NewArticlePageComponent } from './pages/new-article-page/new-article-page.component';
import { ArticlePageComponent } from './pages/article-page/article-page.component'

@NgModule({
  declarations: [NewArticlePageComponent, ArticlePageComponent],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    AngularEditorModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
})
export class ArticlesModule {}
