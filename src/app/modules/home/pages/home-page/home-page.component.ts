import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { LoginFormComponent } from '../../components/login-form/login-form.component'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog() {
    this.dialog.open(LoginFormComponent)
  }
}
