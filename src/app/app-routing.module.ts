import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
} from '@angular/fire/compat/auth-guard'

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
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: () => redirectUnauthorizedTo(['/']),
    },
  },
  {
    path: 'quizz',
    loadChildren: () =>
      import('./modules/quizz/quizz.module').then((m) => m.QuizzModule),
    canActivate: [AngularFireAuthGuard],
    data: {
      authGuardPipe: () => redirectUnauthorizedTo(['/']),
    },
  },
  {
    path: 'articulos',
    loadChildren: () =>
      import('./modules/articles/articles.module').then(
        (m) => m.ArticlesModule,
      ),
  },
  {
    path: 'perfil',
    loadChildren: () =>
      import('./modules/profile/profile.module').then((m) => m.ProfileModule),
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
