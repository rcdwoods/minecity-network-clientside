import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'minecity';

  constructor(
    private router: Router
  ) {}

  urlIsLogin() {
    if(this.router.url == '/login') {
      return true;
    }
    return false;
  }
}
