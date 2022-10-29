import { MaterialModule } from './../material/material.module'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { QuizzRoutingModule } from './quizz-routing.module'
import { QuizzPageComponent } from './quizz-page/quizz-page.component'

@NgModule({
  declarations: [QuizzPageComponent],
  imports: [CommonModule, QuizzRoutingModule, MaterialModule],
})
export class QuizzModule {}
