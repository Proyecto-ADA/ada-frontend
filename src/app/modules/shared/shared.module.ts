import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedArticlesListComponent } from './components/shared-articles-list/shared-articles-list.component';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SharedArticlesListComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [SharedArticlesListComponent]
})
export class SharedModule { }
