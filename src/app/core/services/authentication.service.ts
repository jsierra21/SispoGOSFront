import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, Subject } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { API_URL } from '../../../environments/environment';
import { Router } from '@angular/router';
import { ResponseAPI } from '../interfaces/http.interface';

export const TOKEN_KEY = 'my-token';
export const CLIENT_CREDENTIALS_KEY = 'client_credentials';
export const USER_KEY = 'user-information';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );

  token = '';
  private initialization;

  userData$ = new BehaviorSubject<any>({});

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private router: Router
  ) {
    this.initialization = this.init();
  }

  async init() {
    await this.loadToken();
  }

  async loadToken() {
    const token = await this.storageService.get(TOKEN_KEY);

    if (token) {
      this.token = token;
      this.isAuthenticated.next(true);
    } else {
      this.isAuthenticated.next(false);
    }
  }

  /*
  login(credentials): Observable<any> {
    return this.http.post<ResponseAPI>(`${API_URL}/auth/user/`,credentials).pipe(
      map((response: ResponseAPI) => response.data),
      switchMap(async token => {
        return from(await this.storageService.set(TOKEN_KEY, token));
      }),
      tap(_ => {
        this.isAuthenticated.next(true);
      })
    )
  }
  */
  async login(credentials) {
    const response = await this.http
      .post<ResponseAPI>(`${API_URL}/auth/user_prod/`, credentials)
      .toPromise();
    return response.data;
  }

  /*
  login(credentials): Observable<any> {
    return this.http.post<ResponseAPI>(`${API_URL}/auth/user/`, credentials).pipe(
      map((response: ResponseAPI) => response.data),
      tap(async clientCredentials => {
        return from(await this.storageService.set(CLIENT_CREDENTIALS_KEY, clientCredentials));
      })
    )
  }

  getToken(credentials): Observable<any> {
    return this.http.post<ResponseAPI>('https://desarrollo.syspotec.co:8081/ords/cartago/servig/auth/oauthprod/', credentials).pipe(
      map((response: ResponseAPI) => response.data),
      switchMap(async token => {
        return from(await this.storageService.set(TOKEN_KEY, token));
      }),
      tap(_ => {
        this.isAuthenticated.next(true);
      })
    )
  }
  */

  getUser(): Observable<any> {
    return this.http.post<ResponseAPI>(`${API_URL}/gos/user/`, {}).pipe(
      map((response: ResponseAPI) => response.data),
      tap(async (user) => {
        await this.storageService.set(USER_KEY, user);
      })
    );
  }

  getUserSesion() {
    this.storageService.get(USER_KEY).then((res) => {
      this.userData$.next(res);
    });
  }

  async logout(): Promise<void> {
    this.isAuthenticated.next(false);
    await this.storageService.clear();
    return;
  }
}
