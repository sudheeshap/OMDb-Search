import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userLogin();
  }

  userLogin(): void {
    this.userService.login();
  }
}
