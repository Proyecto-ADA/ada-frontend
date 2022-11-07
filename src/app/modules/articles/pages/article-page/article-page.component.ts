import { IComment } from './../../../../core/models/comment.interface'
import { IArticle } from 'src/app/core/models/article.interface'
import { concatMap, switchMap } from 'rxjs'
import { ActivatedRoute } from '@angular/router'
import { Component, ElementRef, OnInit } from '@angular/core'
import { ArticlesService } from 'src/app/core/services/articles.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { FormControl, Validators } from '@angular/forms'
import { ViewChild } from '@angular/core'

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

  comment = new FormControl('', [Validators.required])
  commentsList: IComment[] = []

  constructor(
    private articlesService: ArticlesService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
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
  }

  async addComment(event: Event) {
    event.preventDefault()
    if (!this.article || !this.articleId) {
      return
    }
    const comment: IComment = {
      user: {},
      comment: this.comment.value || '',
    }
    this.article.comments = [...this.article.comments, comment]

    await this.articlesService.update(this.articleId, this.article)
    this.commentsList = [...this.commentsList, comment]
    this.commentInput.nativeElement.value = ''
  }
}
