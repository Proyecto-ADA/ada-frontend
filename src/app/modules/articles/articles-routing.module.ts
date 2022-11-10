import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { NewArticlePageComponent } from './pages/new-article-page/new-article-page.component'
import { ArticlePageComponent } from './pages/article-page/article-page.component'
import { ArticlesListComponent } from './pages/articles-list/articles-list.component'
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard'

const routes: Routes = [
  {
    path: '',
    component: ArticlesListComponent,
  },
  {
    path: 'nuevo',
    component: NewArticlePageComponent,
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: () => redirectUnauthorizedTo(['/']),
    },
  },
  {
    path: ':id',
    component: ArticlePageComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ArticlesRoutingModule {}
