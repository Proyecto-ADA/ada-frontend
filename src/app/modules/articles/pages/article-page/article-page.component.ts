import { IArticle } from 'src/app/core/models/article.interface'
import { concatMap, switchMap } from 'rxjs'
import { ActivatedRoute } from '@angular/router'
import { Component, OnInit } from '@angular/core'
import { ArticlesService } from 'src/app/core/services/articles.service'
import { MatSnackBar } from '@angular/material/snack-bar'

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss'],
})
export class ArticlePageComponent implements OnInit {
  message: string | undefined
  article: IArticle | undefined
  constructor(
    private articlesService: ArticlesService,
    private route: ActivatedRoute,
    private _snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        concatMap(({ message }) => {
          this._snackBar.open(message, undefined, {
            duration: 10000,
            horizontalPosition: 'right',
          })
          this.message = message
          return this.route.params
        }),

        switchMap(({ id }) => this.articlesService.retrieveArticle(id)),
      )
      .subscribe((response) => {
        if (response.exists) {
          this.article = response.data()
          console.log(this.article)
        }
      })
  }
}
