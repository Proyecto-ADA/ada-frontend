import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { QuestionService } from 'src/app/core/services/question.service'

@Component({
  selector: 'app-add-question-dialog',
  templateUrl: './add-question-dialog.component.html',
  styleUrls: ['./add-question-dialog.component.scss'],
})
export class AddQuestionDialogComponent implements OnInit {
  questionForm: FormGroup
  posibleAnswers: string[] = []
  isLoading = false
  constructor(
    private fb: FormBuilder,
    private questionsService: QuestionService,
  ) {
    this.questionForm = fb.group({
      question: ['', [Validators.required, Validators.minLength(20)]],
      answer1: ['', [Validators.required, Validators.minLength(10)]],
      answer2: ['', [Validators.required, Validators.minLength(10)]],
      answer3: ['', [Validators.required, Validators.minLength(10)]],
      rightAnswerNumber: [null, Validators.required],
      score: [null, Validators.required],
      isEnabled: [false],
    })
  }

  ngOnInit(): void {
    this.questionForm.valueChanges.subscribe(() => {
      this.posibleAnswers = []
      if (this.answer1?.valid) {
        this.posibleAnswers = [...this.posibleAnswers, this.answer1.value]
      }
      if (this.answer2?.valid) {
        this.posibleAnswers = [...this.posibleAnswers, this.answer2.value]
      }
      if (this.answer3?.valid) {
        this.posibleAnswers = [...this.posibleAnswers, this.answer3.value]
      }
    })
  }

  get question() {
    return this.questionForm.get('question')
  }

  get answer3() {
    return this.questionForm.get('answer3')
  }

  get answer2() {
    return this.questionForm.get('answer2')
  }

  get answer1() {
    return this.questionForm.get('answer1')
  }

  async addQuestion() {
    if (this.questionForm.invalid) {
      return
    }
    this.isLoading = true

    const response = await this.questionsService.addQuestion(
      this.questionForm.value,
    )

    console.log(response)

    this.isLoading = false
  }
}
