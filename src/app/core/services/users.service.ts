import { Observable } from 'rxjs'
import { IUser } from './../models/user.interface'
import { Injectable } from '@angular/core'
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore'

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private usersCollection: AngularFirestoreCollection<IUser>
  users: Observable<IUser[]>

  constructor(private afs: AngularFirestore) {
    this.usersCollection = afs.collection<IUser>('users')
    this.users = this.usersCollection.valueChanges({
      idField: 'id',
    })
  }

  add(user: IUser) {
    return this.usersCollection.add(user)
  }
}
