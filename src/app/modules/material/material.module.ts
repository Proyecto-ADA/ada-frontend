import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatIconModule } from '@angular/material/icon'
import { MatTableModule } from '@angular/material/table'
import { MatSelectModule } from '@angular/material/select'
import { MatSlideToggleModule } from '@angular/material/slide-toggle'
import { MatMenuModule } from '@angular/material/menu'
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatStepperModule } from '@angular/material/stepper'
import { MatRadioModule } from '@angular/material/radio'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatRadioModule,
  ],
  exports: [
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTableModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatRadioModule,
  ],
})
export class MaterialModule {}
