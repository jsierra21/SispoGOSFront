import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { StorageService } from './storage.service';
import * as moment from 'moment-timezone';
import { forkJoin, Observable } from 'rxjs';
import {StoredRequest} from '../interfaces/offline.interface';
export const STORAGE_REQUEST_KEY = 'store-request';

@Injectable({
  providedIn: 'root'
})
export class OfflineManagerService {
  momentjs: any = moment;

  constructor(
    private storageService: StorageService,
    private toastController: ToastController
  ) {
    this.momentjs.tz.setDefault('America/Bogota');
   }

  async storeRequest(id:number, type:string, data: any, method: string, url:string){
    
    const newStoredRequest: StoredRequest = {
      id: id,
      type: type,
      data: data,
      method: method,
      url: url,
      time: this.momentjs().format('DD/MM/YYYY HH:mm'),
    }

    this.storageService.get(STORAGE_REQUEST_KEY).then(async (storedOperations)=>{
      const storeObject = (storedOperations) ? storedOperations.find(
        storedRequest =>  storedRequest.id     === newStoredRequest.id &&
                          storedRequest.type   === newStoredRequest.type
      ) : null;
      storedOperations = (storeObject) ? storedOperations[storedOperations.indexOf(storeObject)] : [newStoredRequest];
      
      return await this.storageService.set(STORAGE_REQUEST_KEY, storedOperations);

    });



    
/*
    let toast = this.toastController.create({
      message: `Tus datos se almacenaran localmente porque parece que estás en modo Offline`,
      duration: 3000,
      position: 'bottom'
    });

    toast.then(toast => toast.present());

    //Consultamos el estado inicial de la orden
    const oldOrder = await this.storageService.getObjectfromArray(ORDERS_KEY, 'id', order.id.toString());
    
    let action: IOrderUpdate = {
      id: order.id,
      status: order['order-status']['id'],
      order: order,
      'old-order': oldOrder,
      time: this.momentjs().format('DD/MM/YYYY HH:mm'),
    }

    await this.storageService.updateObjectFromArray(ORDERS_KEY, 'id', order.id, order);

    const storedOperations = await this.storageService.get(STORAGE_UPDATE_ODERS_KEY);

    let storedObj = storedOperations;

    if (storedObj) {

      let updateOrder = storedObj.find(order => order.id === action.id &&
        order.status === action.status);
      if (updateOrder) {
        let index = storedObj.indexOf(updateOrder);
        storedObj[index] = action;
      } else {
        storedObj.push(action);
      }
    } else {
      storedObj = [action];
    }
    return await this.storageService.set(STORAGE_UPDATE_ODERS_KEY, storedObj);*/
  }

  async checkForEvents() {
    /*
    let storedOperations = await this.storageService.get(STORAGE_UPDATE_ODERS_KEY);
    if (storedOperations && storedOperations.length > 0) {
      storedOperations = await storedOperations.map((element)=> element.order);
      try {
        const data = await this.httpService.Put({ 'orders': storedOperations }, `gos/orders/`).toPromise();
        let toast = this.toastController.create({
          message: `Los datos locales se han sincronizado con éxito con la API.`,
          duration: 3000,
          position: 'bottom'
        });
        toast.then(toast => toast.present());
        await this.storageService.remove(STORAGE_UPDATE_ODERS_KEY);
      } catch (error) {
        console.log(error);
      }
    }
    */
  }
}
