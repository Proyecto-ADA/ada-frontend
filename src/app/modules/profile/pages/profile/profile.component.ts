import { IQuizzHistory } from './../../../../core/models/quizzHistory.interface'
import { Component, OnInit } from '@angular/core'
import { IArticle } from 'src/app/core/models/article.interface'
import { ArticlesService } from 'src/app/core/services/articles.service'
import { AuthService } from 'src/app/core/services/auth.service'
import { QuizzService } from 'src/app/core/services/quizz.service'
import { UsersService } from 'src/app/core/services/users.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: any
  userArticles: IArticle[] = []
  likedArticles: IArticle[] = []
  userQuizzes: IQuizzHistory[] = []
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private articlesService: ArticlesService,
    private quizzService: QuizzService,
  ) {}

  ngOnInit(): void {
    this.authService
      .isLoggedIn()

      .subscribe(async (user) => {
        if (!user) {
          return
        }
        const auxUser = await this.usersService.findByUid(user.uid)
        this.user = auxUser.docs[0].data()

        this.articlesService.articles.subscribe((articles) => {
          this.userArticles = articles.filter(
            ({ user }) => user.uid === this.user.uid,
          )

          this.likedArticles = articles.filter(({ id }) =>
            this.user.likedArticles.includes(id),
          )
        })

        this.quizzService.history.subscribe((history) => {
          this.userQuizzes = history.filter(
            ({ userUid }) => userUid === this.user.uid,
          )
        })
      })
  }
}
