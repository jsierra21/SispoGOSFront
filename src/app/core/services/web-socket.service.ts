
import { Injectable, EventEmitter, Output } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SERVER_SOCKET } from 'src/environments/environment';
import { AuthenticationService } from '../services/authentication.service';
import { StorageService } from './storage.service';


@Injectable()

export class WebSocketService extends Socket {
  /**
 * Declaramos un metodo de emitir el cual llamaremos "outEven"
 */
  @Output() outEven: EventEmitter<any> = new EventEmitter();

  /**
   * En nuestro constructor injectamos el "CookieService" para luego hacer uso de sus metodos.
   */
  constructor(
    private authService: AuthenticationService,
    private storageService: StorageService
  ) {

    /**
     * En nuestro "super" declaramos la configuración inicial de conexión la cual hemos declarado en nuestro
     * "environment.serverSocket",
     * tambien vemos como pasamos el "payload" dentro de options y "query"
     */
    
    super({
      url: SERVER_SOCKET,
      options: {
        query: {
          token: authService.token,
          origin: 'GOSMobile'
        },
        //'transports': ['websocket'],
        //'upgrade': false
      },

    });


    /**
     * ---------------- ESCUCHAMOS----------------
     * En este punto nuestro socket.io-client esta listo para recibir los eventos.
     * 
     * En esta funcion vemos como esta preparado para recibir un evento llamado "message" el cual
     * una vez sea recibido va a emitir por nuestro "outEven"
     */

    this.ioSocket.on('hello', res => { 
      console.log('Esto es una pruena');
      console.log(res)
      //this.outEven.emit(res) 
      
    });

  }

  public emitEvent(event, payload) {
    this.ioSocket.emit(event, payload);
  }

  /**
   * ---------------- EMITIR-------------------
   * Ahora solo nos falta poder emitir mensajes, para ello declaramos la funcion
   * "emitEvent" la cual va ser disparada por un "(click)" la cual emite un envento
   * con el nombre "default", y un payload de información el cual sera parseado 
   * por nuestro backend.
   */


}
