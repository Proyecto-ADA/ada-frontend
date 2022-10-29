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
  constructor(private questionsService: QuestionService) {}

  ngOnInit(): void {
    this.questionsService.questions.subscribe((questions) => {
      this.questions = questions.filter(({ isEnabled }) => isEnabled)
    })
  }
}
