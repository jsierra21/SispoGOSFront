import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import * as moment from 'moment-timezone';

import { Order } from 'src/app/shared/interfaces/order.interface';
import { OrdersService, ORDER_STATUS } from 'src/app/shared/services/orders.service';
import { PhotoService } from 'src/app/shared/services/photo.service';

@Component({
  selector: 'app-execute-order',
  templateUrl: './execute-order.page.html',
  styleUrls: ['./execute-order.page.scss'],
})
export class ExecuteOrderPage implements OnInit {
  momentjs: any = moment;

  id: any;
  order: Order;
  orderStatus;

  orderForm: FormGroup;
  _isSubmitted: Boolean = false;

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private route: ActivatedRoute,
    private ordersService: OrdersService,
    private fb: FormBuilder,
    private alertController: AlertController,
    
  ) {
    this.momentjs.tz.setDefault('America/Bogota');
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.orderStatus = ORDER_STATUS
  }

  ngOnInit() {
    this.orderForm = this.fb.group({
      observation: ['', [Validators.required, Validators.minLength(6)]],
    });

    this.ordersService.getOrders(false, this.id).subscribe(
      (order: Order) => {
        this.order = order;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async updateOrder() {
    const alert = await this.alertController.create({
      header: 'Confirmación!',
      message: '¿Está seguro de ejecutar la orden?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
        }, {
          text: 'Sí',
          handler:() => {
            this.putOrder();
          }
        }
      ]
    });
    await alert.present();
  }

  putOrder(){
    const orderUpdate: Order = { ...this.order, ...this.orderForm.value };

    const statusNext = this.ordersService.getNewStatus(this.order['order-status']['id']);
    
    orderUpdate['date-execution'] = this.momentjs().format('DD/MM/YYYY HH:mm');

    this.ordersService.putOrder(orderUpdate).subscribe(
      async (data) => {
        const orderU = data.orders[0];
        if(!orderU?.['successful']){
          const alert = await this.alertController.create({
            header: '¡Atención!',
            message: `Problemas al actualizar la orden, ${orderU?.['message']}`,
            buttons: ['OK']
          });
        
          await alert.present();
        }else{
          this.router.navigate([`/options/orders/${statusNext.url}${orderUpdate['id']}`], { replaceUrl: true });
        }
        //
        this.router.navigate([`/options/orders/${statusNext.url}${orderUpdate['id']}`], { replaceUrl: true });
      },
      (error) => {
        console.log(error);
      },
      ()=>{
        this._isSubmitted = true;
      }
    );
  }

  // Easy access for form fields
  get observation() {
    return this.orderForm.get('observation');
  }
}
