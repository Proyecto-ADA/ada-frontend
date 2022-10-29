import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms'
import { IQuestion } from 'src/app/core/models/question.interface'
import { Component, OnInit } from '@angular/core'
import { QuestionService } from 'src/app/core/services/question.service'

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

  send() {
    console.log(this.answers.value)
  }

  get answers() {
    return this, this.answersForm.get('answers') as FormArray
  }
}
