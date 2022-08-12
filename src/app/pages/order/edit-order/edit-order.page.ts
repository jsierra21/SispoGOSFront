import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { withLatestFrom } from 'rxjs/operators';
import { IOrder } from 'src/app/Interfaces/interfaces';
import { OrdersService, ORDER_STATUS } from 'src/app/services/orders.service';

@Component({
  selector: 'app-edit-order',
  templateUrl: './edit-order.page.html',
  styleUrls: ['./edit-order.page.scss'],
})
export class EditOrderPage implements OnInit {
  id: any;
  order: IOrder;
  orderStatus;

  orderForm: FormGroup;

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private orderSevice: OrdersService,
    private fb: FormBuilder,
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
    this.orderStatus = ORDER_STATUS
  }

  ngOnInit() {
    this.orderSevice.getOrder(this.id).then(res => {
      this.order = res;
      console.log(this.order)
    });

    
    this.orderForm = this.fb.group({
      observation: ['', [Validators.required, Validators.minLength(6)]],
    });
  }


  async updateOrder() {
    const orderUpdate: IOrder = {...this.order, ...this.orderForm.value}
    if(this.orderStatus[this.order?.['order-status']['id']]?.['next_status']){

    }
    await this.orderSevice.updateOrder(this.id,  orderUpdate).then(res => {
      console.log(res);
      this.router.navigateByUrl('opciones/ordenes');
    })
  }

  // Easy access for form fields
  get observation() {
    return this.orderForm.get('observation');
  }
}
