import { MatDialog } from '@angular/material/dialog'
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { IQuestion } from 'src/app/core/models/question.interface'
import { Component, OnInit } from '@angular/core'
import { QuestionService } from 'src/app/core/services/question.service'
import { IQuizzHistory } from 'src/app/core/models/quizzHistory.interface'
import { SendQuizzConfirmationDialogComponent } from '../../components/send-quizz-confirmation-dialog/send-quizz-confirmation-dialog.component'
import { UsersService } from 'src/app/core/services/users.service'
import { AuthService } from 'src/app/core/services/auth.service'

@Component({
  selector: 'app-quizz-page',
  templateUrl: './quizz-page.component.html',
  styleUrls: ['./quizz-page.component.scss'],
})
export class QuizzPageComponent implements OnInit {
  questions: IQuestion[] = []
  answersForm: FormGroup
  user: any

  constructor(
    private questionsService: QuestionService,
    private fb: FormBuilder,
    private dialogService: MatDialog,
    private usersService: UsersService,
    private authService: AuthService
  ) {
    this.answersForm = this.fb.group({
      answers: fb.array([]),
    })
  }

  ngOnInit(): void {
    this.authService.isLoggedIn()
    .subscribe((user) => {
      this.user = user     
    })
    this.questionsService.questions.subscribe((questions) => {
      this.questions = questions.filter(({ isEnabled }) => isEnabled)
      this.questions.forEach(() => {
        this.answers.push(this.fb.control(null))
      })
    })
  }

  async send() {
    const { score, rightAnswers } = this.reviewQuizz(
      this.questions,
      this.answers.value,
    )
    const quizzHistory: IQuizzHistory = {
      answers: [...this.answers.value],
      questions: [...this.questions],
      score,
      rightAnswers,
      userUid: this.user.uid
    }

    const dialogRef = this.dialogService.open(
      SendQuizzConfirmationDialogComponent,
    )

    dialogRef.componentInstance.quizzHistory = quizzHistory
  }

  get answers() {
    return this, this.answersForm.get('answers') as FormArray
  }

  reviewQuizz(questions: IQuestion[], answers: number[]) {
    let score = 0
    let rightAnswers = 0

    questions.forEach((question, i) => {
      const answer = answers[i]

      if (question.rightAnswerNumber === answer) {
        score += question.score
        rightAnswers++
      }
    })

    return { score, rightAnswers }
  }
}
