import { Component, NgZone, OnInit } from '@angular/core';

import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { Platform } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { WebSocketService } from '../core/services/web-socket.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit {
  socket;

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

  subscription: Subscription;

  constructor(
    private platform: Platform,
    protected webSocketService: WebSocketService,
    private geolocation: Geolocation,
    private ngZone: NgZone
  ) {}

  ngOnInit() {
    //   this.platform.ready().then(() => {
    //     this.subscription = this.geolocation
    //       .watchPosition()
    //       .subscribe(async (response: any) => {
    //         const coords = {
    //           lat: response.coords.latitude,
    //           lng: response.coords.longitude,
    //         };
    //         //Update LOCATION
    //         console.log(coords);
    //         this.webSocketService.emitEvent('updateLocation', coords);
    //       });
    //   });
  }

  ionViewDidEnter() {
    console.log('UserHunts run');
    const positionOptions: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: Infinity,
    };

    this.subscription = this.geolocation
      .watchPosition(positionOptions)
      .subscribe(async (response: any) => {
        const coords = {
          lat: response.coords.latitude,
          lng: response.coords.longitude,
        };
        //Update LOCATION
        console.log(coords);
        this.ngZone.run(() => {
          // update the data of the component
          this.webSocketService.emitEvent('updateLocation', coords);
        });
      });
  }
}
