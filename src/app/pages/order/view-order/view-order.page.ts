import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order } from 'src/app/shared/interfaces/order.interface';
import { OrdersService } from 'src/app/shared/services/orders.service';


@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.page.html',
  styleUrls: ['./view-order.page.scss'],
})
export class ViewOrderPage implements OnInit {
  id: any;
  order: Order;
  
  constructor(
    private actRoute: ActivatedRoute,
    private ordersSevice: OrdersService,
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
   }

  ngOnInit() {
    this.ordersSevice.getOrder(this.id).then(res => {
      this.order = res;
      console.log(this.order);
    });
  }

}
