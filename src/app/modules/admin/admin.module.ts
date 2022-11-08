import { ReactiveFormsModule } from '@angular/forms'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { AdminRoutingModule } from './admin-routing.module'
import { MaterialModule } from '../material/material.module'
import { AdminPageComponent } from './pages/admin-page/admin-page.component'
import { AddQuestionDialogComponent } from './components/add-question-dialog/add-question-dialog.component'
import { DeleteConfirmationDialogComponent } from './components/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { ArticlesPageComponent } from './pages/articles-page/articles-page.component'

@NgModule({
  declarations: [
    AdminPageComponent,
    AddQuestionDialogComponent,
    DeleteConfirmationDialogComponent,
    ArticlesPageComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class AdminModule {}
