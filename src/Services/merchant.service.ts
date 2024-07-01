import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  constructor( private _HttpClient : HttpClient) { }


  getMerchantAccounts():Observable<any>{
    return this._HttpClient.get('https://localhost:7270/api/Merchant')
  }

}
