import { Component, Input } from '@angular/core';
import { Order } from 'src/app/shared/interfaces/order.interface';
import { ORDER_STATUS } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent {

  @Input() order: Order;
  public orderStatus: any;

  constructor() {
    this.orderStatus = ORDER_STATUS;
  }

}
