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
    this.questions = this.questionsCollection.valueChanges({
      idField: 'id',
    })
  }

  addQuestion(question: IQuestion) {
    return this.questionsCollection.add(question)
  }

  deleteQuestion(id: string) {
    return this.questionsCollection.doc(id).delete()
  }

  update(id: string, question: IQuestion) {
    return this.questionsCollection.doc(id).update(question)
  }
}
