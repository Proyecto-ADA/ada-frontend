import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { HomeRoutingModule } from './home-routing.module'
import { HomePageComponent } from './pages/home-page/home-page.component'
import { MaterialModule } from '../material/material.module'
import { SignUpFormComponent } from './components/signup-form/signup-form.component';
import { CompleteProfileComponent } from './components/complete-profile/complete-profile.component'

@NgModule({
  declarations: [HomePageComponent, SignUpFormComponent, CompleteProfileComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class HomeModule {}
