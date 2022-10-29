import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { IQuestion } from 'src/app/core/models/question.interface'
import { Component, OnInit } from '@angular/core'
import { QuestionService } from 'src/app/core/services/question.service'
import { QuizzService } from 'src/app/core/services/quizz.service'
import { IQuizzHistory } from 'src/app/core/models/quizzHistory.interface'

@Component({
  selector: 'app-quizz-page',
  templateUrl: './quizz-page.component.html',
  styleUrls: ['./quizz-page.component.scss'],
})
export class QuizzPageComponent implements OnInit {
  questions: IQuestion[] = []
  answersForm: FormGroup

  constructor(
    private questionsService: QuestionService,
    private fb: FormBuilder,
    private quizzService: QuizzService,
  ) {
    this.answersForm = this.fb.group({
      answers: fb.array([]),
    })
  }

  ngOnInit(): void {
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
    }

    const response = await this.quizzService.addHistory(quizzHistory)
    console.log(response)
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
