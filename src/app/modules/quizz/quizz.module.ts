import { ReactiveFormsModule } from '@angular/forms'
import { MaterialModule } from './../material/material.module'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { QuizzRoutingModule } from './quizz-routing.module'
import { QuizzPageComponent } from './quizz-page/quizz-page.component';
import { SendQuizzConfirmationDialogComponent } from './components/send-quizz-confirmation-dialog/send-quizz-confirmation-dialog.component'

@NgModule({
  declarations: [QuizzPageComponent, SendQuizzConfirmationDialogComponent],
  imports: [
    CommonModule,
    QuizzRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class QuizzModule {}
