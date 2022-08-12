import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/shared/interfaces/order.interface';
import { OrdersService, ORDER_STATUS } from 'src/app/shared/services/orders.service';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
})
export class OrderDetailComponent implements OnInit {
  @Input()order: Order;
  orderStatus;

  constructor(
    private orderSevice: OrdersService,
    private actRoute: ActivatedRoute,
  ) { 
    this.orderStatus = ORDER_STATUS;

  }

  ngOnInit() {
  }

}
