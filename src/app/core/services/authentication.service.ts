import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { API_URL } from '../../../environments/environment';
import { ResponseAPI } from '../interfaces/http.interface';
import { StorageService } from '../services/storage.service';

export const TOKEN_KEY = 'my-token';
export const CLIENT_CREDENTIALS_KEY = 'client_credentials';
export const USER_KEY = 'user-information';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  userData$ = new BehaviorSubject<any>({});

  // Init with null to filter out the first value in a guard!
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    null
  );

  token = '';

  private initialization;

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

  login(credentials: any): Observable<ResponseAPI> {
    return this.http.post<ResponseAPI>(`${API_URL}/auth/user_prod/`, credentials);
  }

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
