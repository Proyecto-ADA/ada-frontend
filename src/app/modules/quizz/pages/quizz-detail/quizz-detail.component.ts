import { Component, OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { switchMap } from 'rxjs'
import { QuizzService } from 'src/app/core/services/quizz.service'

@Component({
  selector: 'app-quizz-detail',
  templateUrl: './quizz-detail.component.html',
  styleUrls: ['./quizz-detail.component.scss'],
})
export class QuizzDetailComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private quizzService: QuizzService,
  ) {}

  ngOnInit(): void {
    this.getQuizz()
  }

  getQuizz() {
    this.route.params
      .pipe(
        switchMap((params) => this.quizzService.getQuizzHistory(params['id'])),
      )
      .subscribe((response) => {
        console.log(response.data())
      })
  }
}
