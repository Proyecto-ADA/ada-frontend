import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { AuthService } from './core/services/auth.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Proyecto Ada'
  user!: any

  constructor(private titleService: Title, private authService: AuthService) {
    this.titleService.setTitle(this.title)
  }

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe(user => {
      console.log(user);
      this.user = user
    })
  }
}
