import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceService } from './auth-service.service';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService {
  
  constructor(private http:HttpClient) { 
    
  }
token :any = '';
  header = new HttpHeaders({
  'Authorization': `Bearer ${this.token}`
})
  getAllGovernmentTocreateOrder():Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}Government`);
  }

  getAllCitiesBasedOnGovernments( id:number):Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}City/ByGovernment?id=${id}`)
  }
  getAllShippingType():Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}ShippingType`)
  }
  getAllPaymentType( ):Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}Payment`)
  }
  getAllBranch( ):Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}Branch`)
  }
}
