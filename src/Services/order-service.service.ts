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
    return this.http.get<any>(`${environment.apiUrl}/Government`,{ headers:this.header })
  }

  getAllCitiesBasedOnGovernments( id:number):Observable<any>{
    return this.http.get<any>(`${environment.apiUrl}/City/ByGovernment?id${id}`,{ headers:this.header })
  }
}
