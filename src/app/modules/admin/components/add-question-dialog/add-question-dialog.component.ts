import { IQuestion } from 'src/app/core/models/question.interface'
import { MatDialog } from '@angular/material/dialog'
import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { QuestionService } from 'src/app/core/services/question.service'

@Component({
  selector: 'app-add-question-dialog',
  templateUrl: './add-question-dialog.component.html',
  styleUrls: ['./add-question-dialog.component.scss'],
})
export class AddQuestionDialogComponent implements OnInit {
  @Input() editQuestion: IQuestion | undefined
  questionForm: FormGroup
  posibleAnswers: string[] = []
  isLoading = false
  constructor(
    private fb: FormBuilder,
    private questionsService: QuestionService,
    private dialogService: MatDialog,
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
    if (this.editQuestion) {
      this.intializeForm()
    }
    this.questionForm.valueChanges.subscribe(() => {
      this.getPosibleAnswers()
    })
  }

  getPosibleAnswers() {
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
  }

  intializeForm() {
    this.questionForm.patchValue({
      question: this.editQuestion?.question,
      answer1: this.editQuestion?.answer1,
      answer2: this.editQuestion?.answer2,
      answer3: this.editQuestion?.answer3,
      rightAnswerNumber: this.editQuestion?.rightAnswerNumber,
      score: this.editQuestion?.score,
      isEnabled: this.editQuestion?.isEnabled,
    })
    this.getPosibleAnswers()
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

    if (!!this.editQuestion) {
      await this.questionsService.update(
        this.editQuestion.id,
        this.questionForm.value,
      )
    } else {
      await this.questionsService.addQuestion(this.questionForm.value)
    }

    this.isLoading = false
    this.dialogService.closeAll()
  }
}
