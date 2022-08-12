import { Component, OnInit, ViewChild } from '@angular/core';
import { Order } from 'src/app/shared/interfaces/order.interface';
import {
  OrdersService,
  ORDER_STATUS,
} from 'src/app/shared/services/orders.service';
import { IonSlides, ModalController } from '@ionic/angular';
import { SearchFiltersPage } from 'src/app/pages/order/search-filters/search-filters.page';

@Component({
  selector: 'app-orders',
  templateUrl: 'orders.page.html',
  styleUrls: ['orders.page.scss'],
})
export class OrdersPage implements OnInit {
  @ViewChild('slides', { read: IonSlides }) slides: IonSlides;
  orders: Array<Order> = [];
  orderStatusList = [];
  filters: any;

  activeIndex = 7;
  private lastY = 0;

  constructor(
    private ordersService: OrdersService,
    private modalCtrl: ModalController
  ) {
    this.orderStatusList = Object.entries(ORDER_STATUS).map(
      (element) => element[1]
    );
  }

  ngOnInit() {
    this.loadData(true);
  }

  ionViewWillEnter() {
    this.loadData(false);
  }

  doRefresh(event) {
    this.loadData(true, event);
  }

  async loadData(refresh = false, refresher?) {
    this.ordersService.getOrders(refresh, null, this.filters).subscribe(
      (orders) => {
        if (refresher) {
          refresher.target.complete();
        }
        this.orders = this.activeIndex
          ? orders.filter(
              (element) =>
                element?.['order-status']?.['id'] === this.activeIndex
            )
          : orders;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onClickSlide(id) {
    this.activeIndex = id;
    this.loadData(false, null);
  }

  async openSearchFilters() {
    const modal = await this.modalCtrl.create({
      component: SearchFiltersPage,
      cssClass: 'modal-filters',
      componentProps: {
        filters: this.filters,
      },
    });

    modal.onDidDismiss().then(async (filtersR) => {
      if (filtersR.data) {
        const data = filtersR.data;
        this.filters = data;
      } else {
        this.filters = {};
      }
      this.loadData(false, null);
    });
    modal.present();
  }
}
