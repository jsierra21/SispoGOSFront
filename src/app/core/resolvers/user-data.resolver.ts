import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class UserDataResolver {
    constructor(private authService: AuthenticationService) { }

    resolve() {
        return this.authService.getUserSesion();
    }
}