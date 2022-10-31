import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NewArticlePageComponent } from './pages/new-article-page/new-article-page.component'

const routes: Routes = [
  {
    path: 'nuevo',
    component: NewArticlePageComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticlesRoutingModule {}
