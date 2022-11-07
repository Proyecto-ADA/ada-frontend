import { Observable } from 'rxjs'
import { IArticle } from './../models/article.interface'
import { Injectable } from '@angular/core'
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore'

@Injectable({ providedIn: 'root' })
export class ArticlesService {
  private articlesCollection: AngularFirestoreCollection<IArticle>
  articles: Observable<IArticle[]>

  constructor(private afs: AngularFirestore) {
    this.articlesCollection = afs.collection<IArticle>('articles')
    this.articles = this.articlesCollection.valueChanges({
      idField: 'id',
    })
  }

  add(article: IArticle) {
    return this.articlesCollection.add(article)
  }

  retrieveArticle(id: string) {
    return this.articlesCollection.doc(id).get()
  }
}
