import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormBuilder, FormControl } from '@angular/forms'
import { Component, OnInit } from '@angular/core'
import { IArticle } from 'src/app/core/models/article.interface'
import { ArticlesService } from 'src/app/core/services/articles.service'
import { debounceTime } from 'rxjs'
import { QuizzService } from 'src/app/core/services/quizz.service'
import { IQuizzHistory } from 'src/app/core/models/quizzHistory.interface'
import { IUser } from 'src/app/core/models/user.interface'
import { UsersService } from 'src/app/core/services/users.service'

@Component({
  selector: 'app-shared-articles-list',
  templateUrl: './shared-articles-list.component.html',
  styleUrls: ['./shared-articles-list.component.scss'],
})
export class SharedArticlesListComponent implements OnInit {
  allArticles: IArticle[] = []
  articlesToShow: IArticle[] = []
  selectedCategories: string[] = []
  top10: IQuizzHistory[] = []
  usersTop10: IUser[] = []

  searchInput = new FormControl('')
  filters = this.fb.group({
    matemáticas: false,
    ingeniería: false,
    ciencias: false,
    tecnología: false,
  })

  constructor(
    private articlesService: ArticlesService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private quizzService: QuizzService,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.articlesService.articles.subscribe((articles) => {
      this.allArticles = articles.filter(({ isPublished }) => !!isPublished)
      this.articlesToShow = [...this.allArticles]
      this.getArticlesToShow()
    })
    this.handleFiltersChange()
    this.subscribeToQueryParams()
    this.subscribeToSearchInput()
    this.quizzService.history.subscribe(async (history) => {
      this.top10 = history.sort((a, b) => b.score - a.score)

      for(const quizz of this.top10) {
        const user = await this.usersService.findByUid(quizz.userUid)  
        this.usersTop10 = [...this.usersTop10, user.docs[0].data()]
      }
  
    })
  }

  subscribeToSearchInput() {
    this.searchInput.valueChanges
      .pipe(debounceTime(400))
      .subscribe((changes) => {
        if (!changes || changes?.length === 0) {
          this.articlesToShow = [...this.allArticles]
        } else {
          this.articlesToShow = this.allArticles.filter(({ title }) =>
            title.includes(changes),
          )
        }
      })
  }

  handleFiltersChange() {
    this.filters.valueChanges.subscribe((values) => {
      this.router.navigate(['.'], {
        relativeTo: this.route,
        queryParams: values,
      })
    })
  }

  subscribeToQueryParams() {
    this.route.queryParams.subscribe((params) => {
      this.selectedCategories = Object.entries(params)
        .filter((element) => element[1] === 'true')
        .map((element) => element[0])

      this.selectedCategories.forEach((c) =>
        this.filters.get(c)?.patchValue(true),
      )

      this.getArticlesToShow()
    })
  }

  getArticlesToShow() {
    this.articlesToShow =
      this.selectedCategories.length === 0
        ? [...this.allArticles]
        : this.allArticles.filter(({ categories }) =>
            this.filterCategories(categories, this.selectedCategories),
          )
  }

  filterCategories(categories: string[], selectedCategories: string[]) {
    return categories.some((category) =>
      selectedCategories.includes(category.toLowerCase()),
    )
  }
}
