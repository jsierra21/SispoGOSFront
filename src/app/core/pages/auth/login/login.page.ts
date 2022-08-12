import {
  AuthenticationService,
  USER_KEY,
  TOKEN_KEY,
} from 'src/app/core/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials: FormGroup;
  isSubmitted = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
    private storageService: StorageService
  ) {}
  ngOnInit() {
    this.credentials = this.fb.group({
      user: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }
  async login() {
    try {
      await this.authService
        .login(this.credentials.value)
        .then(async (clientCredentials) => {
          await this.storageService.set(TOKEN_KEY, clientCredentials.token);
          this.authService.isAuthenticated.next(true);
          this.router.navigateByUrl('/information-sync', { replaceUrl: true });
          // try {
          //   await this.authService.getToken(clientCredentials).then(async (token) => {
          //   });
          // } catch (error) {
          //   console.log(error);
          // }
        });
    } catch (error) {
      console.log(error);
    }

    /*
    this.isSubmitted = true;
    this.authService.login(this.credentials.value).subscribe(
      async (res) => {
        console.log(res)
        //this.router.navigateByUrl('/information-sync', { replaceUrl: true });
      },
      async (error) => {
        console.log(error);
      },
      async ()=>{
        this.isSubmitted = true;
      }
    );*/
  }
  // Easy access for form fields
  get email() {
    return this.credentials.get('user');
  }
  get password() {
    return this.credentials.get('password');
  }
}
