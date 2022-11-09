import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { QuestionService } from 'src/app/core/services/question.service'
import { SignUpFormComponent } from '../../components/signup-form/signup-form.component'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  openDialog() {
    this.dialog.open(SignUpFormComponent)
  }
}
