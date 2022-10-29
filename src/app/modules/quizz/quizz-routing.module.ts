import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { QuizzPageComponent } from './quizz-page/quizz-page.component'

const routes: Routes = [
  {
    path: '',
    component: QuizzPageComponent,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuizzRoutingModule {}
