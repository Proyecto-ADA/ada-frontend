import { IQuestion } from 'src/app/core/models/question.interface'
import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { switchMap } from 'rxjs'
import { IQuizzHistory } from 'src/app/core/models/quizzHistory.interface'
import { QuizzService } from 'src/app/core/services/quizz.service'

@Component({
  selector: 'app-quizz-detail',
  templateUrl: './quizz-detail.component.html',
  styleUrls: ['./quizz-detail.component.scss'],
})
export class QuizzDetailComponent implements OnInit {
  isLoading = false
  quizz!: IQuizzHistory
  constructor(
    private route: ActivatedRoute,
    private quizzService: QuizzService,
  ) {}

  ngOnInit(): void {
    this.getQuizz()
  }

  getQuizz() {
    this.isLoading = true
    this.route.params
      .pipe(
        switchMap((params) => this.quizzService.getQuizzHistory(params['id'])),
      )
      .subscribe((response) => {
        if (response.exists) {
          this.quizz = response.data() as IQuizzHistory
        }
        console.log(this.quizz)
        this.isLoading = false
      })
  }

  getAnswer(question: any, givenAnswerNumber: number) {
    return question[`answer${givenAnswerNumber}`]
  }

  isRightAnswer(question: IQuestion, answerNumber: number) {
    return question.rightAnswerNumber === answerNumber
  }
}
