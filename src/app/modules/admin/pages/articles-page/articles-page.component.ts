import { Component, OnInit } from '@angular/core'
import { IArticle } from 'src/app/core/models/article.interface'
import { ArticlesService } from 'src/app/core/services/articles.service'

@Component({
  selector: 'app-articles-page',
  templateUrl: './articles-page.component.html',
  styleUrls: ['./articles-page.component.scss'],
})
export class ArticlesPageComponent implements OnInit {
  articles: IArticle[] = []
  displayedColumns: string[] = [
    'id',
    'titulo',
    'categorias',
    'usuario',
    'estaPublicado',
    'acciones',
  ]
  constructor(private articlesService: ArticlesService) {}

  ngOnInit(): void {
    this.articlesService.articles.subscribe((articles) => {
      this.articles = articles
    })
  }

  async updateArticle(article: IArticle) {
    await this.articlesService.update(article.id || '', {
      ...article,
      isPublished: !article.isPublished,
    })
  }
}
