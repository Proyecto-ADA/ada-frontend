import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { AuthService } from 'src/app/core/services/auth.service'
import { QuestionService } from 'src/app/core/services/question.service'
import { SignUpFormComponent } from '../../components/signup-form/signup-form.component'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private dialog: MatDialog, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((user) => {
      console.log(user)
    })
  }

  openSignUpDialog() {
    this.dialog.open(SignUpFormComponent)
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(SignUpFormComponent)
    dialogRef.componentInstance.title = 'Inicia sesión'
    dialogRef.componentInstance.type = 'login'
  }

  async signOut() {
    await this.authService.signOut()
  }
}
