import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Injectable } from '@angular/core'
import { GoogleAuthProvider } from 'firebase/auth'

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}

  signUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
  }

  signInWithGoogle() {
    return this.afAuth.signInWithPopup(new GoogleAuthProvider())
  }

  isLoggedIn() {
    return this.afAuth.user
  }

  signOut() {
    return this.afAuth.signOut()
  }

  signIn(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password)
  }
}
