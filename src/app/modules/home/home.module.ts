import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { HomeRoutingModule } from './home-routing.module'
import { HomePageComponent } from './pages/home-page/home-page.component'
import { MaterialModule } from '../material/material.module'
import { LoginFormComponent } from './components/login-form/login-form.component'

@NgModule({
  declarations: [HomePageComponent, LoginFormComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class HomeModule {}
