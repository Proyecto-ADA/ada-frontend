import { SanitizeHtmlPipe } from './pipes/safe-html.pipe'
import { MaterialModule } from './../material/material.module'
import { ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AngularEditorModule } from '@kolkov/angular-editor'

import { ArticlesRoutingModule } from './articles-routing.module'
import { NewArticlePageComponent } from './pages/new-article-page/new-article-page.component'
import { ArticlePageComponent } from './pages/article-page/article-page.component'
import { ShareButtonModule } from 'ngx-sharebuttons/button'
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { ArticlesListComponent } from './pages/articles-list/articles-list.component'

@NgModule({
  declarations: [
    NewArticlePageComponent,
    ArticlePageComponent,
    SanitizeHtmlPipe,
    ArticlesListComponent,
  ],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    AngularEditorModule,
    ReactiveFormsModule,
    MaterialModule,
    ShareButtonModule,
    ShareIconsModule,
  ],
  exports: [ArticlesListComponent]
})
export class ArticlesModule {}
