import { Injectable } from '@angular/core'
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpResponse,
	HttpErrorResponse,
} from '@angular/common/http'
import { Observable, EMPTY, throwError } from 'rxjs'
import { LoadingController, ToastController, AlertController } from '@ionic/angular'
import { retryWhen, delay, take, tap, map, catchError, finalize, switchMap } from 'rxjs/operators'

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
	constructor(
		private loadingCtrl: LoadingController,
		private toastCtrl: ToastController,
		private alertCtrl: AlertController,
	) { }

	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		this.loadingCtrl.getTop().then((hasLoading) => {
			if (!hasLoading) {
				this.loadingCtrl
					.create({
						spinner: 'circular',
						translucent: true,
					})
					.then((loading) => loading.present())
			}
		})

		return next.handle(request).pipe(
			catchError((err) => {
				if (err instanceof HttpErrorResponse) {
					switch ((err as HttpErrorResponse).status) {
						case 400:
							console.log(`Error 400`)
							return throwError(err)
						case 401:
							console.log(`401`)
							return throwError(err)
						case 403:
							console.log(`Error 401 o 403`)
							return throwError(err)
						default:
							return throwError(err)
					}
				} else {
					return throwError(err)
				}
			}),
			catchError((err) => {
				console.log(err)
				this.presentFailedAlert(err.error.body)
				return EMPTY
			}),
			finalize(() => {
				this.loadingCtrl.getTop().then((hasLoading) => {
					if (hasLoading) {
						this.loadingCtrl.dismiss()
					}
				})
			}),
		)
	}

	/**
	 * Muestra Toast con los intentos de reconexión
	 * @param retryCount = contador con numero de intentos
	 */
	async showRetryToast(retryCount: any) {
		const toast = await this.toastCtrl.create({
			message: `Re intentar ${retryCount}/ 3`,
			duration: 3000,
		})
		toast.present()
	}

	/**
	 * Presenta mensaje de error
	 * @param msg = mensaje de error a mostrar
	 */
	async presentFailedAlert(msg: string) {
		console.log(msg)
		const alert = await this.alertCtrl.create({
			header: 'Oops',
			message: msg,
			buttons: ['OK'],
		})
		await alert.present()
		this.loadingCtrl.getTop().then((hasLoading) => {
			if (hasLoading) {
				this.loadingCtrl.dismiss()
			}
		})
	}
}
