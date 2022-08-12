import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IonicStorageModule } from '@ionic/storage-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './core/interceptors/token.interceptor';

import { Network } from '@ionic-native/network/ngx';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { DynamicFormControlService } from './shared/services/dynamic-form.service';
import { DatePipe } from '@angular/common';
import { Camera } from '@ionic-native/camera/ngx';

import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { SERVER_SOCKET } from 'src/environments/environment';

const config: SocketIoConfig = { url: SERVER_SOCKET, options: {} };


@NgModule({
  declarations: [AppComponent,],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    SocketIoModule.forRoot(config)
  ],
  providers: [
    Geolocation,
    Camera,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    Network,
    DynamicFormControlService,
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
