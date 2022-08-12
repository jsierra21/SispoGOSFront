import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController } from '@ionic/angular';
import { OrderType } from 'src/app/shared/interfaces/order.interface';

@Component({
  selector: 'app-change-order-type-modal',
  templateUrl: './change-order-type-modal.page.html',
  styleUrls: ['./change-order-type-modal.page.scss'],
})
export class ChangeOrderTypeModalPage implements OnInit {
  @Input() orderTypes: Array<OrderType>;
  @Input() orderType: OrderType;
  orderTypeForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private modalController: ModalController,
    private alertController: AlertController,
  ) { }

  ngOnInit() {
    this.orderTypeForm = this.fb.group({
      orderTypeI: [this.orderType?.id, [Validators.required]],
    });
  }

  async updateOrderType(){

    if(this.orderTypeI.value === this.orderType?.id){
      await this.modalController.dismiss();
    }else{
      const alert = await this.alertController.create({
        header: 'Confirmación!',
        message: '¿Está seguro de cambiar el tipo de la orden, es posible que los items y los datos adicionales sean borrados?',
        buttons: [
          {
            text: 'No',
            role: 'cancel',
            cssClass: 'secondary',
          }, {
            text: 'Sí',
            handler:async () => {
              await this.modalController.dismiss(this.orderTypeForm.value);
            }
          }
        ]
      });
      await alert.present();
    }
  }

  get orderTypeI() {
    return this.orderTypeForm.get('orderTypeI');
  }

}
