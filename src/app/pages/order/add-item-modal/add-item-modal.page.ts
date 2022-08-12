import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { OrderType } from 'src/app/shared/interfaces/order.interface';

@Component({
  selector: 'app-add-item-modal',
  templateUrl: './add-item-modal.page.html',
  styleUrls: ['./add-item-modal.page.scss'],
})
export class AddItemModalPage implements OnInit {
  @Input() orderType: OrderType;
  itemForm: FormGroup;

  filterTerm: string;


  constructor(
    private modalController: ModalController,
  ) {}

  ngOnInit() {
  }

  async addItem(vItemS){
    let item ={
      itemS: vItemS,
      quantity:1
    }
    
    if(vItemS){
      await this.modalController.dismiss(/*this.itemForm.value*/item);
    }else{
      await this.modalController.dismiss();
    }
  }

}
