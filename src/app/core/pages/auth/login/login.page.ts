import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService, TOKEN_KEY } from 'src/app/core/services/authentication.service';
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
    private router: Router,
    private storageService: StorageService
  ) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      user: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async login() {
    try {

      const login = await this.authService.login(this.credentials.value).toPromise();

      await this.storageService.set(TOKEN_KEY, login.data.token);
      this.authService.isAuthenticated.next(true);
      this.router.navigateByUrl('/information-sync', { replaceUrl: true });

    } catch (error) {
      console.log(error);
    }
  }

  get email() {
    return this.credentials.get('user');
  }
  get password() {
    return this.credentials.get('password');
  }
}
