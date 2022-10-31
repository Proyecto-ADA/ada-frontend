import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'quizz',
    loadChildren: () =>
      import('./modules/quizz/quizz.module').then((m) => m.QuizzModule),
  },
  {
    path: 'articulos',
    loadChildren: () =>
      import('./modules/articles/articles.module').then(
        (m) => m.ArticlesModule,
      ),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
