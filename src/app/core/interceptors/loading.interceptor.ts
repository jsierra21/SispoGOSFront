import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const ignore = request.params.get('ignore') || false;

    if (ignore) {
      return next.handle(request);
    }

    this.loadingCtrl.getTop().then((hasLoading) => {
      if (!hasLoading) {
        this.loadingCtrl
          .create({
            spinner: 'circular',
            translucent: true,
          })
          .then((loading) => loading.present());
      }
    });

    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          return throwError(err);
        }
      }),
      catchError((err) => {
        this.presentFailedAlert(err.error.body || err.error.message || err.statusText);
        return EMPTY;
      }),
      finalize(() => {
        this.loadingCtrl.getTop().then((hasLoading) => {
          if (hasLoading) {
            this.loadingCtrl.dismiss();
          }
        });
      }),
    );
  }

  async showRetryToast(retryCount: any) {
    const toast = await this.toastCtrl.create({
      message: `Re intentar ${retryCount}/ 3`,
      duration: 3000,
    });
    toast.present();
  }

  async presentFailedAlert(msg: string) {
    const alert = await this.alertCtrl.create({
      header: 'Oops',
      message: msg,
      buttons: ['OK'],
    });
    await alert.present();
    this.loadingCtrl.getTop().then((hasLoading) => {
      if (hasLoading) {
        this.loadingCtrl.dismiss();
      }
    });
  }
}
