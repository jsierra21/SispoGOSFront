import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResponseAPI } from 'src/app/core/interfaces/http.interface';
import { API_URL } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})

export class GeolocationService {

  constructor(private http: HttpClient) {
  }

  public save(data: any): Observable<ResponseAPI> {
    return this.http.post<ResponseAPI>(`${API_URL}/gos/geolocation`, data, { params: { ignore: true } });
  }

}
