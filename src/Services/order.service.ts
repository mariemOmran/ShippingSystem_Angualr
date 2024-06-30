import { OrderCounts } from './../Models/order-counts';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  baseUrl: string = 'https://localhost:7270/api/Orders';
  constructor(private httpclient: HttpClient) {}

  GetAllOrderCounts(): Observable<OrderCounts[]> {
    return this.httpclient.get<OrderCounts[]>(
      `${this.baseUrl}/OrdersCount?merchantId=0`
    );
  }

  GetAllMerchantOrderCounts(merchamtId: number): Observable<OrderCounts[]> {
    return this.httpclient.get<OrderCounts[]>(
      `${this.baseUrl}/OrdersCount?merchantId=${merchamtId}`
    );
  }
}
