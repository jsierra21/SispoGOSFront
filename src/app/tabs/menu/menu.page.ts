import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/core/interfaces/auth.interface';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.page.html',
  styleUrls: ['menu.page.scss']
})
export class MenuPage {
  authUser: User;
  constructor(
    private authService: AuthenticationService,
    private alertController: AlertController,
    private router: Router,
  ) {}
  
  ngOnInit() {
    this.authService.userData$.subscribe((user: User) => {
      this.authUser = user;
    });
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Confirmación!',
      message: '¿Está seguro de cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Confirmar',
          handler: async () => {
            await this.authService.logout();
            this.router.navigateByUrl('/', { replaceUrl: true });
          }
        }
      ]
    });

    await alert.present();

    
  }

}
