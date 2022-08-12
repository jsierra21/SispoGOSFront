import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from '../../../interfaces/order.interface';
import { OrdersService, ORDER_STATUS } from '../../../services/orders.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.scss'],
})
export class OrderListComponent implements OnInit {
  @Input() orders: Array<Order>;
  @ViewChild(CdkVirtualScrollViewport) viewPort: CdkVirtualScrollViewport;
  orderStatus;

  constructor() {
    this.orderStatus = ORDER_STATUS;
  }

  ngOnInit() {}
}
