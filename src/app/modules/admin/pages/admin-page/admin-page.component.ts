import { Component, OnInit } from '@angular/core'
import { IQuestion } from 'src/app/core/models/question.interface'
import { QuestionService } from 'src/app/core/services/question.service'

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'],
})
export class AdminPageComponent implements OnInit {
  questions: Array<IQuestion & { id: number }> = []
  displayedColumns: string[] = [
    'id',
    'question',
    'rightQuestion',
    'answer1',
    'answer2',
    'answer3',
  ]

  constructor(private questionsService: QuestionService) {}

  ngOnInit(): void {
    this.getQuestions()
  }

  getQuestions() {
    this.questionsService.questions.subscribe((questions) => {
      this.questions = questions.map((question, index) => ({
        ...question,
        id: index + 1,
      }))
      console.log(this.questions)
    })
  }
}
