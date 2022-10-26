import { IQuestion } from './../models/question.interface'
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

@Injectable({ providedIn: 'root' })
export class QuestionService {
  private questionsCollection: AngularFirestoreCollection<IQuestion>
  questions: Observable<IQuestion[]>

  constructor(private afs: AngularFirestore) {
    this.questionsCollection = afs.collection<IQuestion>('questions')
    this.questions = this.questionsCollection.valueChanges()
  }

  addQuestion(question: IQuestion) {
    return this.questionsCollection.add(question)
  }
}
