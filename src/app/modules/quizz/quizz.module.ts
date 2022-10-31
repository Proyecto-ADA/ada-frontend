import { ReactiveFormsModule } from '@angular/forms'
import { MaterialModule } from './../material/material.module'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { QuizzRoutingModule } from './quizz-routing.module'
import { QuizzPageComponent } from './pages/quizz-page/quizz-page.component'
import { SendQuizzConfirmationDialogComponent } from './components/send-quizz-confirmation-dialog/send-quizz-confirmation-dialog.component'
import { QuizzSendedDialogComponent } from './components/quizz-sended-dialog/quizz-sended-dialog.component';
import { QuizzDetailComponent } from './pages/quizz-detail/quizz-detail.component'

@NgModule({
  declarations: [
    QuizzPageComponent,
    SendQuizzConfirmationDialogComponent,
    QuizzSendedDialogComponent,
    QuizzDetailComponent,
  ],
  imports: [
    CommonModule,
    QuizzRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class QuizzModule {}
