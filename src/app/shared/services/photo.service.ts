import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Observable } from 'rxjs';
import { ResponseAPI } from 'src/app/core/interfaces/http.interface';
import { API_URL } from 'src/environments/environment';
import { Resource } from '../interfaces/resource';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  public clickedImage: string;

  options = {
    quality: 10,
    allowEditing: false,
    resultType: CameraResultType.Base64
  };

  constructor(
    private http: HttpClient
  ) { }

  /**
   *
   * @deprecated Use save
   */
  async captureImage(idOrder: number) {
    const image = await Camera.getPhoto(this.options);
    const response = await this.http.post<ResponseAPI>(`${API_URL}/gos/file/`, { id_order: idOrder, file: image.base64String }).toPromise();
    return response.data?.file;
  }

  save(id: number, pos: number, resource: Resource): Observable<ResponseAPI> {
    return this.http.post<ResponseAPI>(`${API_URL}/gos/file/`, {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      id_order: id, pos, mimetype: resource.mimetype, file: resource.base64
    });
  }

}
