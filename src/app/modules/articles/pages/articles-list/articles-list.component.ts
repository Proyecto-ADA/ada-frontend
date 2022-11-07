import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormBuilder } from '@angular/forms'
import { Component, OnInit } from '@angular/core'
import { IArticle } from 'src/app/core/models/article.interface'
import { ArticlesService } from 'src/app/core/services/articles.service'

@Component({
  selector: 'app-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss'],
})
export class ArticlesListComponent implements OnInit {
  allArticles: IArticle[] = []
  articlesToShow: IArticle[] = []

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
  ) {}

  ngOnInit(): void {
    this.articlesService.articles.subscribe((articles) => {
      this.allArticles = articles.filter(({ isPublished }) => !!isPublished)
      this.articlesToShow = [...this.allArticles]
    })
    this.handleFiltersChange()
    this.subscribeToQueryParams()
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
      const selectedCategories = Object.entries(params)
        .filter((element) => element[1] === 'true')
        .map((element) => element[0])

      this.articlesToShow =
        selectedCategories.length === 0
          ? [...this.allArticles]
          : this.allArticles.filter(({ categories }) =>
              this.filterCategories(categories, selectedCategories),
            )
    })
  }

  filterCategories(categories: string[], selectedCategories: string[]) {
    return categories.some((category) =>
      selectedCategories.includes(category.toLowerCase()),
    )
  }
}
