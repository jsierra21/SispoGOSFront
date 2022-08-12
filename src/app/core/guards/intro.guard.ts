import { StorageService } from '../services/storage.service'
import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';

export const INTRO_KEY = 'intro-seen';

@Injectable({
  providedIn: 'root'
})

export class IntroGuard implements CanLoad {

  constructor(
    private storageService: StorageService, 
    private router: Router
  ) {
  }

  async canLoad() {
    const hasSeenIntro = await this.storageService.get(INTRO_KEY);
    if (hasSeenIntro && (hasSeenIntro === 'true')) {
      return true;
    } else {
      this.router.navigateByUrl('/intro', { replaceUrl: true });
      return false;
    }
  }
}