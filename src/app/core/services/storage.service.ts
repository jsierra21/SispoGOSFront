import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) {
    this.initStorage();
  }

  async initStorage() {
    await this.storage.create();
  }

  public async set(key: string, value: any) {
    return await this.storage?.set(key, value);
  }

  public async get(key: string) {
    return await this.storage?.get(key);
  }

  public async getObjectfromArray(key: string, param: string, value:string){
    const array = await this.get(key);
    return await array.find(element => element[param] == value);
  }

  public async updateObjectFromArray(key: string, param: string, value:any, newObject: any){
    let array = await this.get(key);
    const objectF = await array.find(element => element[param] == value);

    let index = await array.indexOf(objectF);
    array[index] = newObject;
    return await this.set(key, array);
  }

  public async remove(key: string) {
    await this.storage?.remove(key);
  }

  public async clear() {
    await this.storage?.clear();
  }
}