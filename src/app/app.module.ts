import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokenInterceptor } from './core/interceptors/token.interceptor';

import { DatePipe } from '@angular/common';
import { Camera } from '@ionic-native/camera/ngx';
import { Network } from '@ionic-native/network/ngx';
import { LoadingInterceptor } from './core/interceptors/loading.interceptor';
import { DynamicFormControlService } from './shared/services/dynamic-form.service';

import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';


@NgModule({
  declarations: [AppComponent,],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot()
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
export class AppModule { }
