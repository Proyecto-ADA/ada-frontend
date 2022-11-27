import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from '@angular/material/snack-bar'
import { Title } from '@angular/platform-browser'
import { AuthService } from './core/services/auth.service'
import { SignUpLoginFormComponent } from './modules/home/components/signup-login-form/signup-login-form.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Proyecto Ada'
  user!: any

  constructor(private titleService: Title, private authService: AuthService, private dialog: MatDialog, private _snackBar: MatSnackBar) {
    this.titleService.setTitle(this.title)
  }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(user => {
      this.user = user
      if(this.user) {
        this.openSnackBar()
      }
    })
  }

  openSnackBar() {
    this._snackBar.open("Has iniciado sesión", "", {
      duration: 3 * 1000,
    });
  }

  openSignUpDialog() {
    this.dialog.open(SignUpLoginFormComponent)
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(SignUpLoginFormComponent)
    dialogRef.componentInstance.title = 'Inicia sesión'
    dialogRef.componentInstance.type = 'login'
  }

  async signOut() {
    await this.authService.signOut()
  }
}
