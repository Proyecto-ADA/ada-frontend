import { MatDialog } from '@angular/material/dialog'
import { IUser } from './../../../../core/models/user.interface'
import { Component, Input, OnInit } from '@angular/core'
import { StorageService } from 'src/app/core/services/storage.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { UsersService } from 'src/app/core/services/users.service'

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.scss'],
})
export class CompleteProfileComponent implements OnInit {
  @Input() user!: IUser
  @Input() userId = ''
  isLoading = false
  imageUrl: string | undefined
  image: string | undefined

  profileForm: FormGroup

  constructor(
    private storageService: StorageService,
    private fb: FormBuilder,
    private usersService: UsersService,
    private dialogService: MatDialog,
  ) {
    this.profileForm = this.fb.group({
      firstName: fb.control('', [Validators.required]),
      lastName: fb.control('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.image = this.user.profileImage
  }

  get firstName() {
    return this.profileForm.get('firstName')
  }

  get lastName() {
    return this.profileForm.get('lastName')
  }

  handleFileChange(event: Event) {
    const target = event.target as HTMLInputElement
    if (!target.files) {
      return
    }
    const file = target.files[0]
    if (!file.type.includes('image')) {
      return
    }

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      this.image = reader.result as string
    }
    this.storageService
      .uploadImageToFireStorage('/', file)
      .subscribe((response) => {
        this.imageUrl = response.body.imageUrl
      })
  }

  async completeProfile() {
    this.isLoading = true
    this.user = {
      ...this.user,
      firstName: this.firstName?.value,
      lastName: this.lastName?.value,
      profileImage: !!this.imageUrl ? this.imageUrl : this.user.profileImage,
    }
    await this.usersService.update(this.userId, this.user)
    this.dialogService.closeAll()
  }
}
