import { ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { AngularEditorModule } from '@kolkov/angular-editor'

import { ArticlesRoutingModule } from './articles-routing.module'
import { NewArticlePageComponent } from './pages/new-article-page/new-article-page.component'

@NgModule({
  declarations: [NewArticlePageComponent],
  imports: [
    CommonModule,
    ArticlesRoutingModule,
    AngularEditorModule,
    ReactiveFormsModule,
  ],
})
export class ArticlesModule {}
