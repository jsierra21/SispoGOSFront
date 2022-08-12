import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ResponseAPI } from 'src/app/core/interfaces/http.interface';
import { API_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PhotoService implements OnInit {
  public clickedImage: string;

  options = {
    quality: 10,
    allowEditing: false,
    resultType: CameraResultType.Base64
  }

  constructor(
    private http: HttpClient,
  ) { }

  ngOnInit() {

  }
   async captureImage(idOrder) {
    const image = await Camera.getPhoto(this.options);
    const response = await  this.http.post<ResponseAPI>(`${API_URL}/gos/file/`,{"id_order":idOrder, "file":image.base64String}).toPromise();
    return response.data?.file;
   }

}
