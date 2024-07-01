import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private _HttpClient:HttpClient ) {}

  getDeliveryAccounts():Observable<any>{
    return this._HttpClient.get('https://localhost:7270/api/Delivery')
  }


  addDeliveryAccount( DeliveryData:object):Observable<any>{
    return this._HttpClient.post('https://localhost:7270/api/Delivery',DeliveryData)
  }
}
