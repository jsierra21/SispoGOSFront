import { Injectable } from '@angular/core'
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor,
	HttpResponse,
	HttpErrorResponse,
} from '@angular/common/http'
import { Observable, of, from, throwError } from 'rxjs'
import { map, switchMap, share, catchError } from 'rxjs/operators'

import { StorageService } from '../services/storage.service'
import { AuthenticationService, TOKEN_KEY } from '../services/authentication.service'
import { Router } from '@angular/router'
import { AlertController, ToastController } from '@ionic/angular'

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
	isLoading = false

	constructor(
		private storageService: StorageService,
		private auth: AuthenticationService,
		private router: Router,
		private alertController: AlertController
	) {
	}

	intercept(req: HttpRequest<any>, next: HttpHandler) {
		// convert promise to observable using 'from' operator
		return from(this.handle(req, next))
	}

	async handle(request: HttpRequest<any>, next: HttpHandler) {

		await this.storageService.initStorage();

		const token = await this.storageService.get(TOKEN_KEY);
		if (token) {
			request = request.clone({
				setHeaders: {
					Authorization: `Bearer ${token}`
				}
			})
		}

		if (!request.headers.has('Content-Type')) {
			request = request.clone({
				setHeaders: {
					'content-type': 'application/json'
				}
			});
		}

		request = request.clone({
			headers: request.headers.set('Accept', 'application/json')
		});


		// Important: Note the .toPromise()
		//return next.handle(request).toPromise()
		return next.handle(request).pipe(
			map((event: HttpEvent<any>) => {
				if (event instanceof HttpResponse) {
					console.log('event--->>>', event);
				}
				return event;
			}),
			catchError((error: HttpErrorResponse) => {
				if (error.status === 401) {
					if (error.error.status === false) {
						this.presentAlert();
					} else {
						this.auth.logout().then(() => {
							this.router.navigateByUrl('login', { replaceUrl: true });
						})
					}
				}
				return throwError(error);
			})).toPromise();
	}

	async presentAlert() {
		const alert = await this.alertController.create({
			header: '¡Atención!',
			message: 'Usuario y/o Contraseña Incorrecta',
			buttons: ['OK']
		});
	
		await alert.present();
	  }
}
