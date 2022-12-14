import { DeleteConfirmationDialogComponent } from '../../components/delete-confirmation-dialog/delete-confirmation-dialog.component'
import { AddQuestionDialogComponent } from '../../components/add-question-dialog/add-question-dialog.component'
import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { IQuestion } from 'src/app/core/models/question.interface'
import { QuestionService } from 'src/app/core/services/question.service'

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  questions: IQuestion[] = []
  displayedColumns: string[] = [
    'id',
    'question',
    'rightQuestion',
    'answer1',
    'answer2',
    'answer3',
    'score',
    'isEnabled',
    'acciones',
  ]

  constructor(
    private questionsService: QuestionService,
    private dialogService: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getQuestions()
  }

  getQuestions() {
    this.questionsService.questions.subscribe((questions) => {
      this.questions = questions
    })
  }

  openAddQuestionDialog() {
    const ref = this.dialogService.open(AddQuestionDialogComponent)
    ref.componentInstance.title = 'Agrega una nueva pregunta'
  }

  delete(id: string) {
    const componentRef = this.dialogService.open(
      DeleteConfirmationDialogComponent,
    )
    const instance = componentRef.componentInstance as any
    instance.questionId = id
  }

  edit(question: IQuestion) {
    const ref = this.dialogService.open(AddQuestionDialogComponent)
    ref.componentInstance.editQuestion = question
    ref.componentInstance.title = 'Editar pregunta'
  }

  async changeStatus(question: IQuestion) {
    question.isEnabled = !question.isEnabled
    await this.questionsService.update(question.id, question)
  }
}
