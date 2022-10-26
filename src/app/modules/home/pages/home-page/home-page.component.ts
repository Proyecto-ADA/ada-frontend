import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { QuestionService } from 'src/app/core/services/question.service'
import { LoginFormComponent } from '../../components/login-form/login-form.component'

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private questionsService: QuestionService,
  ) {}

  ngOnInit(): void {
    this.questionsService.questions.subscribe((questions) => {
      console.log('Estas son', questions)
    })
  }

  async openDialog() {
    const response = await this.questionsService.addQuestion({
      answer1: 'pruebas',
      answer2: 'asdasd',
      answuer3: 'asdasd',
      isEnabled: true,
      quesiton: 'asdasd',
      score: 1500,
      rightAnswerNumber: 1,
    })

    console.log(response)

    this.dialog.open(LoginFormComponent)
  }
}
