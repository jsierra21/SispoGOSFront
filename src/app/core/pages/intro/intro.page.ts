import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/core/services/storage.service';
import { INTRO_KEY } from 'src/app/core/guards/intro.guard';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {

  constructor(
    private storageService: StorageService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  async start() {
    await this.storageService.set(INTRO_KEY, 'true');
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }

}
