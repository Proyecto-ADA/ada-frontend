import { MatDialog } from '@angular/material/dialog'
import { Component, Input, OnInit } from '@angular/core'
import { QuestionService } from 'src/app/core/services/question.service'

@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.scss'],
})
export class DeleteConfirmationDialogComponent implements OnInit {
  @Input() questionId = ''
  isLoading = false

  constructor(
    private questionsService: QuestionService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {}

  async delete() {
    this.isLoading = true
    await this.questionsService.deleteQuestion(this.questionId)
    this.dialog.closeAll()
  }
}
