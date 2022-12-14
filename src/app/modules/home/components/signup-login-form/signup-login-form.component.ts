import { CompleteProfileComponent } from '../complete-profile/complete-profile.component'
import { MatDialog } from '@angular/material/dialog'
import { IUser } from '../../../../core/models/user.interface'
import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { UsersService } from 'src/app/core/services/users.service'
import { AuthService } from '../../../../core/services/auth.service'
import { MatIconRegistry } from '@angular/material/icon'
import { DomSanitizer } from '@angular/platform-browser'

const googleLogoURL =
  'https://raw.githubusercontent.com/fireflysemantics/logo/master/Google.svg'

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-login-form.component.html',
  styleUrls: ['./signup-login-form.component.scss'],
})
export class SignUpLoginFormComponent implements OnInit {
  @Input() type: 'signUp' | 'login' = 'signUp'
  @Input() title = 'Registrate ahora'
  hide = true

  signUpForm: FormGroup
  isLoading = false
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private usersService: UsersService,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private dialogService: MatDialog,
  ) {
    this.matIconRegistry.addSvgIcon(
      'logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl(googleLogoURL),
    )
    this.signUpForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    })
  }

  ngOnInit(): void {}

  async signUp() {
    this.isLoading = true
    const { email, password } = this.signUpForm.value
    const response = await this.authService.signUp(email, password)
    await this.createUser(response.user?.uid, this.email?.value)
  }

  async signIn() {
    this.isLoading = true
    await this.authService.signIn(this.email?.value, this.password?.value)
    this.dialogService.closeAll()
  }

  async signUpWithGoogle() {
    const response = await this.authService.signInWithGoogle()

    this.dialogService.closeAll()
    if (this.type === 'signUp') {
      await this.createUser(
        response.user?.uid,
        response.user!.email!,
        response.user!.photoURL!,
      )
    }
  }

  async createUser(
    uid: string | undefined,
    email: string,
    photoURL = 'http://cdn.onlinewebfonts.com/svg/img_561543.png',
  ) {
    const user: IUser = {
      email,
      uid,
      firstName: '',
      lastName: '',
      profileImage: photoURL,
      likedArticles: [],
    }

    const newUser = await this.usersService.add(user)
    this.dialogService.closeAll()
    const completeProfileComponent = this.dialogService.open(
      CompleteProfileComponent,
      {
        disableClose: true,
      },
    )

    completeProfileComponent.componentInstance.user = user
    completeProfileComponent.componentInstance.userId = newUser.id
  }

  get email() {
    return this.signUpForm.get('email')
  }

  get password() {
    return this.signUpForm.get('password')
  }
}
