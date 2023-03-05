import { Component, NgZone } from '@angular/core';

import { Geolocation, Geoposition } from '@awesome-cordova-plugins/geolocation/ngx';
import { User } from '../core/interfaces/auth.interface';
import { AuthenticationService } from '../core/services/authentication.service';
import { GeolocationService } from '../shared/services/geolocation.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {

  tabs = [
    { name: 'Inicio', tab: 'home', icon: 'home-outline' },
    { name: 'Ordenes', tab: 'orders', icon: 'newspaper-outline' },
    {
      name: 'Notificaciones',
      tab: 'notifications',
      icon: 'notifications-outline',
    },
    { name: 'Menú', tab: 'menu', icon: 'person-circle-outline' },
  ];

  constructor(
    private authService: AuthenticationService,
    private geolocationService: GeolocationService,
    private geolocation: Geolocation,
    private ngZone: NgZone
  ) {
  }

  ionViewDidEnter() {

    const positionOptions: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: Infinity
    };

    this.geolocation.watchPosition(positionOptions)
      .subscribe(async (geoposition: Geoposition) => {

        this.authService.userData$.subscribe((userData: User) => {

          const coords = {
            lat: geoposition.coords.latitude,
            lng: geoposition.coords.longitude,
            user: userData.user,
            origin: 'PP'
          };

          this.ngZone.run(() => {
            this.geolocationService.save(coords).subscribe(() => { }, (error) => {
              console.log(error);
            });
          });

        });

      });

  }

}
