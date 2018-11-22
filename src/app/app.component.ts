import { Component } from '@angular/core';

import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(private userService: UserService) {}

  /**
   * @inheritdoc
   */
  ngOnInit() {
    this.userLogin();
  }

  /**
   * Login user (Authentication not added yet, only localStorage ID matching for now)
   * @returns {void}
   */
  userLogin(): void {
    this.userService.login();
  }
}
