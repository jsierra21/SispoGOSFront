import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Diagnostic } from '@awesome-cordova-plugins/diagnostic/ngx';
import { Geolocation, Geoposition } from '@awesome-cordova-plugins/geolocation/ngx';
import { Camera, CameraResultType } from '@capacitor/camera';
import { AlertButton, AlertController, ModalController, Platform, ToastController } from '@ionic/angular';
import { AdditionalDataBase } from 'src/app/shared/interfaces/additional-data-base';
import { Order, OrderType } from 'src/app/shared/interfaces/order.interface';
import { Resource } from 'src/app/shared/interfaces/resource';
import { DynamicFormControlService } from 'src/app/shared/services/dynamic-form.service';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { PhotoService } from 'src/app/shared/services/photo.service';
import { AddItemModalPage } from '../add-item-modal/add-item-modal.page';
import { ChangeOrderTypeModalPage } from '../change-order-type-modal/change-order-type-modal.page';

@Component({
  selector: 'app-close-order',
  templateUrl: './close-order.page.html',
  styleUrls: ['./close-order.page.scss'],
})
export class CloseOrderPage implements OnInit {

  id: any;
  order: Order;
  orderForm: FormGroup;
  itemChange = 0;
  orderTypes: Array<any>;
  orderType: OrderType;

  _isSubmitted = false;

  items: Array<any> = [];
  additionalInformation!: FormGroup;
  additionalInputs: AdditionalDataBase<string>[] | null = [];
  clickedImage: SafeResourceUrl;

  resources: Array<Resource> = [];

  constructor(
    private actRoute: ActivatedRoute,
    private router: Router,
    private ordersService: OrdersService,
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private dfs: DynamicFormControlService,
    private alertController: AlertController,
    private photoService: PhotoService,
    private sanitizer: DomSanitizer,
    private geolocation: Geolocation,
    private diagnostic: Diagnostic,
    private platform: Platform,
    public toastController: ToastController
  ) {
    this.id = this.actRoute.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.additionalInformation = this.fb.group({});
    this.orderForm = this.fb.group({
      causal: ['', [Validators.required]],
      observation: ['', [Validators.required]],
    });

    this.ordersService.getOrders(false, this.id).subscribe(
      async (order: Order) => {

        this.order = order;
        const pictures = this.order?.pictures || [];

        pictures.forEach((resource: any) => {
          this.resources.push({
            urlBase64: this.sanitizer.bypassSecurityTrustUrl(resource.file_b64),
            mimetype: resource.mimetype,
            base64: resource.base64
          });
        });

        this.items = order?.items;
        await this.getOrderType(order?.['order-type']['id']);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  async getOrderType(idOrderType) {
    this.orderType = await this.ordersService.getOrderType(
      this.order?.['operating-unit']['id'],
      idOrderType
    );
    if (this.orderType?.['additional-data']) {
      this.additionalInformation = this.dfs.toFormGroup(
        this.orderType?.['additional-data'] as AdditionalDataBase<string>[],
        this.order?.['additional-data']
      );
      this.additionalInputs = this.orderType?.[
        'additional-data'
      ] as AdditionalDataBase<string>[];
    }
    this.ordersService
      .getOrderTypesChange(this.order?.['operating-unit']['id'], idOrderType)
      .then((types) => {
        this.orderTypes = types;
      });
    this.causal.setValue(this.order?.['causal'].id);
  }

  async openChangeOrderType() {
    const modal = await this.modalCtrl.create({
      component: ChangeOrderTypeModalPage,
      cssClass: 'modal-min',
      componentProps: {
        orderTypes: this.orderTypes,
        orderType: this.orderType,
      },
    });

    modal.onDidDismiss().then(async (ordert) => {
      if (ordert.data) {
        const data = ordert.data;
        this.items = [];

        await this.getOrderType(data.orderTypeI);
      }
    });
    modal.present();
  }
  async openAddItem() {
    const modal = await this.modalCtrl.create({
      component: AddItemModalPage,
      cssClass: 'modal-items',
      componentProps: {
        orderType: this.orderType,
      },
    });

    modal.onDidDismiss().then((item) => {
      if (item.data) {
        const itemS = item.data;
        const itemObject = this.items.find(
          (itemf) => itemS?.itemS === itemf.id
        );

        if (itemObject) {
          this.items[this.items.indexOf(itemObject)].quantity =
            itemObject.quantity + itemS?.quantity;
        } else {
          this.items.unshift({
            ...this.orderType?.items.find(
              (itemF: any) => itemF.id === itemS.itemS
            ),
            ...{ quantity: itemS.quantity },
          });
        }
      }
    });
    modal.present();
  }

  onChangeEvent(e: any, item: any) {
    const value = e.target.value;
    const position = this.items.indexOf(item);
    if (value > 0) {
      if (this.items[position].quantity >= 1) {
        this.items[position].quantity = value;
      }
    } else {
      this.items[position].quantity = 1;
    }
  }

  async lockOrder(status) {
    const statusDisplay = status ? 'Bloquear' : 'Desbloquear';
    const alert = await this.alertController.create({
      header: 'Confirmación!',
      message: `¿Está seguro de ${statusDisplay} la orden?`,
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Sí',
          handler: () => {
            const orderUpdate: Order = {
              ...this.order,
              'order-status': {
                locked: status,
              },
            };

            this.ordersService.putOrder(orderUpdate, 'Locked').subscribe(
              async (data) => {
                const orderU = data.orders[0];
                if (!orderU?.['successful']) {
                  const alert = await this.alertController.create({
                    header: '¡Atención!',
                    message: `Problemas al actualizar la orden, ${orderU?.['message']}`,
                    buttons: ['OK'],
                  });

                  await alert.present();
                } else {
                  this.router.navigate([`/options/orders`], {
                    replaceUrl: true,
                  });
                }
              },
              (error) => {
                console.log(error);
              },
              () => {
                this._isSubmitted = true;
              }
            );
          },
        },
      ],
    });
    await alert.present();
  }

  async closeOrder(event: any) {
    const alert = await this.alertController.create({
      header: 'Confirmación!',
      message: '¿Está seguro de actualizar la orden?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
        },
        {
          text: 'Sí',
          handler: async () => {

            const hasPermission: boolean = this.platform.is('mobileweb') ? true : await this.diagnostic.isLocationEnabled();

            if (!hasPermission) {
              this.showAlert('Acción requerida!', 'Por favor active la ubicación e intente nuevamente', [
                {
                  text: 'No',
                  role: 'cancel',
                  cssClass: 'secondary',
                },
                {
                  text: 'Sí',
                  handler: () => {
                    this.diagnostic.switchToLocationSettings();
                  }
                }]);
              return;
            }

            this.geolocation.getCurrentPosition({ maximumAge: Infinity }).then((geoposition: Geoposition) => {

              const orderUpdate: Order = {
                ...this.order,
                'order-type': this.orderType,
                causal: this.orderType?.['causal'].find(
                  (element) => element.id === this.causal.value
                ),
                observation: this.observation.value,
                items: this.items,
                'additional-data': this.additionalInformation.value,
                latitud: geoposition.coords.latitude,
                longitud: geoposition.coords.longitude,
                'cantidad-soporte': this.resources.length
              };

              const statusNext = this.ordersService.getNewStatus(
                this.order['order-status']['id']
              );

              this.ordersService.putOrder(orderUpdate, event).subscribe(async (data) => {

                const orderU = data.orders[0];

                if (!orderU?.['successful']) {

                  const alertC = await this.alertController.create({
                    header: '¡Atención!',
                    message: `Problemas al actualizar la orden, ${orderU?.['message']}`,
                    buttons: ['OK'],
                  });

                  await alertC.present();

                } else {


                  this.resources.forEach(async (resource, index) => {
                    await this.photoService.save(this.id, (index + 1), resource).toPromise();
                  });

                  if (event === 'Legalize') {
                    this.router.navigate(
                      [`/options/orders/${statusNext.url}${orderUpdate['id']}`],
                      { replaceUrl: true }
                    );
                  }

                }
              },
                (error) => {
                  console.log(error);
                },
                () => {
                  this._isSubmitted = true;
                }
              );
            });

          },
        },
      ],
    });

    await alert.present();
  }

  async capturePhoto() {

    const options = {
      quality: 30,
      allowEditing: false,
      resultType: CameraResultType.Base64
    };

    const image = await Camera.getPhoto(options);
    const mimetype = `image/${image.format}`;

    this.resources.push({
      urlBase64: this.sanitizer.bypassSecurityTrustUrl(`data:${mimetype};base64,${image.base64String}`),
      mimetype,
      base64: image.base64String
    });
  }

  decreaseItems(item) {
    if (this.items[this.items.indexOf(item)].quantity > 1) {
      this.items[this.items.indexOf(item)].quantity =
        this.items[this.items.indexOf(item)].quantity - 1;
    }
  }

  increaseItems(item) {
    this.items[this.items.indexOf(item)].quantity =
      this.items[this.items.indexOf(item)].quantity + 1;
  }

  removeItems(item) {
    this.items.splice(this.items.indexOf(item), 1);
  }

  get causal() {
    return this.orderForm.get('causal');
  }

  get observation() {
    return this.orderForm.get('observation');
  }

  async removeResource(resource: Resource): Promise<void> {

    const alert = await this.showAlert('Confirmación!', 'Está seguro de eliminar el recurso?', [
      {
        text: 'No',
        role: 'cancel',
        cssClass: 'secondary',
      },
      {
        text: 'Sí',
        handler: () => {
          const index: number = this.resources.indexOf(resource);
          this.resources.splice(index, 1);
        }
      }
    ]);

    await alert.onDidDismiss();
  }

  private async showAlert(header: string, message: string, buttons?: (AlertButton | string)[]): Promise<HTMLIonAlertElement> {

    const alert = await this.alertController.create({
      header,
      message,
      buttons,
      backdropDismiss: false,
    });

    await alert.present();
    return alert;
  }

}
