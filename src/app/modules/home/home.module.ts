import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { HomeRoutingModule } from './home-routing.module'
import { HomePageComponent } from './pages/home-page/home-page.component'
import { MaterialModule } from '../material/material.module'
import { SignUpLoginFormComponent } from './components/signup-login-form/signup-login-form.component'
import { CompleteProfileComponent } from './components/complete-profile/complete-profile.component'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  declarations: [
    HomePageComponent,
    SignUpLoginFormComponent,
    CompleteProfileComponent,
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ],
})
export class HomeModule {}
