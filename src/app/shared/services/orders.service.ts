import { Injectable } from '@angular/core';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Order } from '../interfaces/order.interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  NetworkService,
  ConnectionStatus,
} from '../../core/services/network.service';
import { OfflineManagerService } from '../../core/services/offline-manager.service';
import { StorageService } from '../../core/services/storage.service';
import { USER_KEY } from '../../core/services/authentication.service';
import * as moment from 'moment-timezone';
import { ResponseAPI } from 'src/app/core/interfaces/http.interface';
import { API_URL } from 'src/environments/environment';
import { DatePipe } from '@angular/common';
export const ORDERS_KEY = 'orders';

export const ORDER_STATUS = {
  1: { description: 'Todas', icon: 'reorder-four-outline' },
  5: {
    id: 5,
    description: 'Asignada',
    url: 'execute/',
    color: 'primary',
    coloraux: '#1F78F0',
    icon: 'happy-outline',
    next_status: 7,
  },
  7: {
    id: 7,
    description: 'En Ejecución',
    url: 'close/',
    color: 'warning',
    coloraux: '#FFA200',
    icon: 'golf-outline',
    next_status: 8,
  },
  8: {
    id: 8,
    description: 'Cerrada',
    url: 'view/',
    color: 'success',
    coloraux: '#54D14B',
    icon: 'checkmark-circle-outline',
  },
};

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  momentjs: any = moment;

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private networkService: NetworkService,
    private offlineManager: OfflineManagerService,
    private datepipe: DatePipe
  ) {
    this.momentjs.tz.setDefault('America/Bogota');
  }

  getOrders(
    forceRefresh: boolean = false,
    idOrder?: number,
    filters?: any
  ): Observable<any> {
    if (
      this.networkService.getCurrentNetworkStatus() ==
        ConnectionStatus.Offline ||
      !forceRefresh
    ) {
      this.storageService.get(ORDERS_KEY).then(async (orders) => {
        return idOrder ? await this.getOrder(idOrder) : orders;
      });
    }

    /*if(filters){
      filters['start-date'] = this.datepipe.transform(filters?.['start-date'], 'dd/MM/yyyy');
      filters['end-date'] = this.datepipe.transform(filters?.['end-date'], 'dd/MM/yyyy');
    }*/

    const httpOptions = {
      headers: new HttpHeaders({
        skipLoading: 'true',
      }),
      id_order: idOrder,
      ...filters,
    };

    return this.http
      .post<ResponseAPI>(`${API_URL}/gos/orders/`, httpOptions)
      .pipe(
        map((response: ResponseAPI) =>
          idOrder ? response.data?.orders[0] : response.data.orders
        ),
        tap(async (orders) => {
          idOrder
            ? await this.storageService.updateObjectFromArray(
                ORDERS_KEY,
                'id',
                idOrder,
                orders
              )
            : await this.storageService.set(ORDERS_KEY, orders);
        })
      );
  }

  async getOrder(idOrder): Promise<any> {
    return await this.storageService.getObjectfromArray(
      ORDERS_KEY,
      'id',
      idOrder
    );
  }

  putOrder(order: Order, event?: string): Observable<any> {
    if (order['order-status']['id']) {
      const statusNext = this.getNewStatus(order['order-status']['id']);
      const newStatus = {
        id: statusNext.id,
        description: statusNext.description,
      };
      order['order-status'] = newStatus;
    }

    order['action'] = event;

    if (true) {
      //if (this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline) {
      this.offlineManager
        .storeRequest(
          order.id,
          'update-order',
          order,
          'PUT',
          `${API_URL}/gos/orders/`
        )
        .then(async (orders) => {
          return await this.storageService.updateObjectFromArray(
            ORDERS_KEY,
            'id',
            order.id,
            order
          );
        });
    }

    return this.http
      .put<ResponseAPI>(`${API_URL}/gos/orders/`, { orders: [order] })
      .pipe(
        map((response: ResponseAPI) => response.data),
        catchError((err) => {
          this.offlineManager.storeRequest(
            order.id,
            'update-order',
            order,
            'PUT',
            `${API_URL}/gos/orders/`
          );
          throw new Error(err);
        })
      );
  }

  getNewStatus(idStatus) {
    return ORDER_STATUS[ORDER_STATUS[idStatus]['next_status']];
  }

  async getOrderType(iOperatingUnit: number, iOrderType: number) {
    const userInformation = await this.storageService.get(USER_KEY);
    const operatingUnitF = userInformation?.['operating-units'].find(
      (operatingUnitF) => operatingUnitF.id === iOperatingUnit
    );
    const orderType = operatingUnitF?.['work-types'].find(
      (orderTypeF) => orderTypeF.id === iOrderType
    );
    return orderType;
  }

  async getOrderTypesChange(
    operatingUnit: number,
    orderType: number
  ): Promise<any> {
    const workType = await this.getOrderType(operatingUnit, orderType);
    return workType?.['work-types-change'];
  }
}
