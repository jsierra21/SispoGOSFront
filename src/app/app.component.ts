import { Component } from '@angular/core';

import {
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationEvents,
  BackgroundGeolocationResponse
} from '@awesome-cordova-plugins/background-geolocation/ngx';

import { Platform } from '@ionic/angular';
import { User } from './core/interfaces/auth.interface';
import { AuthenticationService } from './core/services/authentication.service';
import { GeolocationService } from './shared/services/geolocation.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(
    private geolocationService: GeolocationService,
    private backgroundGeolocation: BackgroundGeolocation,
    private authService: AuthenticationService,
    private platform: Platform
  ) {
    this.configBackgroundGeolocation();
  }

  configBackgroundGeolocation(): void {

    this.platform.ready().then(() => {

      if (this.platform.is('capacitor')) {

        const config: BackgroundGeolocationConfig = {
          desiredAccuracy: 10,
          stationaryRadius: 15,
          distanceFilter: 10,
          interval: 6000,
          notificationTitle: 'Seguimiento gos',
          notificationText: 'Activado',
          fastestInterval: 10000
        };

        this.backgroundGeolocation.configure(config)
          .then(() => {
            this.backgroundGeolocation.on(BackgroundGeolocationEvents.location)
              .subscribe((location: BackgroundGeolocationResponse) => {

                this.authService.userData$.subscribe((userData: User) => {

                  const coords = {
                    lat: location.latitude,
                    lng: location.longitude,
                    user: userData.user,
                    origin: 'SP'
                  };

                  this.geolocationService.save(coords).subscribe(() => { }, (error) => {
                    console.log(error);
                  });

                });

                this.backgroundGeolocation.finish();
              });
          });

        this.backgroundGeolocation.start();
      }
    });
  }


}
