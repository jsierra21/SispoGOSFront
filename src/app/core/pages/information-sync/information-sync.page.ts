import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-information-sync',
  templateUrl: './information-sync.page.html',
  styleUrls: ['./information-sync.page.scss'],
})
export class InformationSyncPage implements OnInit {

  information = [
    {id:'user-information', description:'Información del usuario', status:'pending'},
    {id:'orders', description: 'Ordenes asignadas', status:'pending'},
    {id:'data', description: 'Datos de gestión', status:'pending'},
  ];

  errorRequest = false;

  constructor(
    private authService: AuthenticationService,
    private ordersService: OrdersService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.sync();
  }

  sync(){
    this.authService.getUser().subscribe(
      ()=>{
        this.information[this.information.findIndex((obj => obj.id === 'user-information'))].status = 'success';
        this.information[this.information.findIndex((obj => obj.id === 'data'))].status = 'success';
        //Get Orders
        this.ordersService.getOrders().subscribe(
          (orders) => {
            this.information[this.information.findIndex((obj => obj.id === 'orders'))].status = 'success';
            this.router.navigateByUrl('/options', { replaceUrl: true });
          },
          (error) => {
            this.errorRequest = true;
            this.information[this.information.findIndex((obj => obj.id === 'orders'))].status = 'error';
            console.log(error);
          }
        );
      },
      (error)=>{
        this.errorRequest = true;
        this.information[this.information.findIndex((obj => obj.id === 'user-information'))].status = 'error';
        this.information[this.information.findIndex((obj => obj.id === 'data'))].status = 'error';
        console.log(error);
      }
    );
  }

}
