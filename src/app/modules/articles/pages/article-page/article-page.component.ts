import { MatDialog } from '@angular/material/dialog'
import { SignUpLoginFormComponent } from './../../../home/components/signup-login-form/signup-login-form.component'
import { IUser } from './../../../../core/models/user.interface'
import { IComment } from './../../../../core/models/comment.interface'
import { IArticle } from 'src/app/core/models/article.interface'
import { concatMap, switchMap } from 'rxjs'
import { ActivatedRoute, Router } from '@angular/router'
import { Component, ElementRef, OnInit } from '@angular/core'
import { ArticlesService } from 'src/app/core/services/articles.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { FormControl, Validators } from '@angular/forms'
import { ViewChild } from '@angular/core'
import { AuthService } from 'src/app/core/services/auth.service'
import { UsersService } from 'src/app/core/services/users.service'

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss'],
})
export class ArticlePageComponent implements OnInit {
  @ViewChild('commentInput') commentInput!: ElementRef
  message: string | undefined
  article: IArticle | undefined
  articleId: string | undefined
  user!: IUser

  comment = new FormControl('', [Validators.required])
  commentsList: IComment[] = []

  constructor(
    private articlesService: ArticlesService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService,
    private usersService: UsersService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        concatMap(({ message }) => {
          if (message) {
            this._snackBar.open(message, undefined, {
              duration: 10000,
              horizontalPosition: 'right',
              verticalPosition: 'top',
            })
          }
          this.message = message
          return this.route.params
        }),

        switchMap(({ id }) => {
          this.articleId = id
          return this.articlesService.retrieveArticle(id)
        }),
      )
      .subscribe((response) => {
        if (response.exists) {
          this.article = response.data()

          if (this.article) {
            this.commentsList = [...this.article.comments]
          }
        }
      })

    this.getLoggedUser()
  }

  async addToLikes() {
    this.user.likedArticles = [...this.user.likedArticles, this.articleId!]
    await this.usersService.update(this.user!.id!, this.user)
  }

  async removeFromLikes() {
    this.user.likedArticles = this.user.likedArticles.filter(
      (article) => article !== this.articleId,
    )
    await this.usersService.update(this.user!.id!, this.user)
  }

  getLoggedUser() {
    this.authService.isLoggedIn().subscribe(async (user) => {
      const response = await this.usersService.findByUid(user!.uid)
      this.user = response.docs[0].data()
      this.user.id = response.docs[0].id
    })
  }

  goToArticlesPage(category: string) {
    this.router.navigate(['/articulos'], {
      queryParams: {
        [category.toLowerCase()]: true,
      },
    })
  }

  async addComment(event: Event) {
    event.preventDefault()
    if (!this.article || !this.articleId) {
      return
    }
    const comment: IComment = {
      user: this.user,
      comment: this.comment.value || '',
    }
    this.article.comments = [...this.article.comments, comment]

    await this.articlesService.update(this.articleId, this.article)
    this.commentsList = [...this.commentsList, comment]
    this.commentInput.nativeElement.value = ''
  }
  openLoginDialog() {
    const dialogRef = this.dialog.open(SignUpLoginFormComponent)
    dialogRef.componentInstance.title = 'Inicia sesión'
    dialogRef.componentInstance.type = 'login'
  }
}
