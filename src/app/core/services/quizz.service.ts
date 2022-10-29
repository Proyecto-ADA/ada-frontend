import { Observable } from 'rxjs'
import { IQuizzHistory } from './../models/quizzHistory.interface'
import { Injectable } from '@angular/core'
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore'

@Injectable({
  providedIn: 'root',
})
export class QuizzService {
  private quizzHistoryCollection: AngularFirestoreCollection<IQuizzHistory>

  history: Observable<IQuizzHistory[]>

  constructor(private afs: AngularFirestore) {
    this.quizzHistoryCollection = afs.collection<IQuizzHistory>('quizzHistory')
    this.history = this.quizzHistoryCollection.valueChanges({
      idField: 'id',
    })
  }

  addHistory(history: IQuizzHistory) {
    return this.quizzHistoryCollection.add(history)
  }
}
