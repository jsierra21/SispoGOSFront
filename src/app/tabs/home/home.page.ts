import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/interfaces/auth.interface';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage implements OnInit {

  public authUser: User;

  constructor(
    private authService: AuthenticationService,
  ) {
  }

  ngOnInit() {
    this.authService.userData$.subscribe((user: User) => {
      this.authUser = user;
    });
  }

}
