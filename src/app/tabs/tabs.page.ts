import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Geolocation, Geoposition } from '@awesome-cordova-plugins/geolocation/ngx';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { User } from '../core/interfaces/auth.interface';
import { AuthenticationService } from '../core/services/authentication.service';
import { GeolocationService } from '../shared/services/geolocation.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit, OnDestroy {

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

  private subscription: Subscription;

  constructor(
    private authService: AuthenticationService,
    private geolocationService: GeolocationService,
    private geolocation: Geolocation,
    private ngZone: NgZone
  ) {
  }

  startTracking() {

    const positionOptions: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: Infinity
    };

    this.subscription = this.geolocation.watchPosition(positionOptions)
      .pipe(filter((geoposition: Geoposition) => geoposition.coords !== undefined))
      .subscribe(async (geoposition: Geoposition) => {

        this.authService.userData$.subscribe((userData: User) => {

          const user: string = userData.user;

          if (user) {
            const coords = {
              lat: geoposition.coords.latitude,
              lng: geoposition.coords.longitude,
              user,
              origin: 'PP'
            };

            this.ngZone.run(() => {
              this.geolocationService.save(coords).subscribe(() => { }, (error) => {
                console.log(error);
              });
            });
          }

        });
      });
  }

  stopTracking() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.startTracking();
  }

  ngOnDestroy(): void {
    this.startTracking();
  }

}
