import { Component, Input, OnInit } from '@angular/core'
import { IQuizzHistory } from 'src/app/core/models/quizzHistory.interface'
import { QuizzService } from 'src/app/core/services/quizz.service'

@Component({
  selector: 'app-send-quizz-confirmation-dialog',
  templateUrl: './send-quizz-confirmation-dialog.component.html',
  styleUrls: ['./send-quizz-confirmation-dialog.component.scss'],
})
export class SendQuizzConfirmationDialogComponent implements OnInit {
  @Input() quizzHistory!: IQuizzHistory
  constructor(private quizzService: QuizzService) {}

  ngOnInit(): void {}

  async sendQuizz() {
    const response = await this.quizzService.addHistory(this.quizzHistory)
    console.log(response.id)
  }
}
