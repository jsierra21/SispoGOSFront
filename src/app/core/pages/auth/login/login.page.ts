import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthenticationService, TOKEN_KEY } from 'src/app/core/services/authentication.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  credentials: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private router: Router,
    private storageService: StorageService,
    private toastCtrl: ToastController,
  ) { }

  ngOnInit() {
    this.credentials = this.fb.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async login() {
    try {

      if (this.credentials.invalid) {
        this.showToast();
        return;
      }

      const login = await this.authService.login(this.credentials.value).toPromise();

      await this.storageService.set(TOKEN_KEY, login.data.token);
      this.authService.isAuthenticated.next(true);
      this.router.navigateByUrl('/information-sync', { replaceUrl: true });

    } catch (error) {
      console.log(error);
    }
  }

  private async showToast(): Promise<HTMLIonToastElement> {

    const toast = await this.toastCtrl.create({
      message: 'Por favor digite su usuario y contraseña',
      position: 'top',
      color: 'danger',
      duration: 3000
    });

    toast.present();
    return toast;
  }

}
