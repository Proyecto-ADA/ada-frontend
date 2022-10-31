import { QuizzDetailComponent } from './pages/quizz-detail/quizz-detail.component'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { QuizzPageComponent } from './pages/quizz-page/quizz-page.component'

const routes: Routes = [
  {
    path: '',
    component: QuizzPageComponent,
  },
  {
    path: ':id',
    component: QuizzDetailComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizzRoutingModule {}
