import { QuizzSendedDialogComponent } from './../quizz-sended-dialog/quizz-sended-dialog.component'
import { MatDialog } from '@angular/material/dialog'
import { Component, Input, OnInit, ViewChild } from '@angular/core'
import { IQuizzHistory } from 'src/app/core/models/quizzHistory.interface'
import { QuizzService } from 'src/app/core/services/quizz.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-send-quizz-confirmation-dialog',
  templateUrl: './send-quizz-confirmation-dialog.component.html',
  styleUrls: ['./send-quizz-confirmation-dialog.component.scss'],
})
export class SendQuizzConfirmationDialogComponent implements OnInit {
  @Input() quizzHistory!: IQuizzHistory
  isLoading = false

  constructor(
    private quizzService: QuizzService,
    private dialogService: MatDialog,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  async sendQuizz() {
    this.isLoading = true
    const response = await this.quizzService.addHistory(this.quizzHistory)
    this.dialogService.closeAll()
    this.dialogService
      .open(QuizzSendedDialogComponent)
      .afterClosed()
      .subscribe(() => {
        this.router.navigateByUrl(`/quizz/${response.id}`)
      })
  }
}
