import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public globalVariable: any = 'Initial Value';
  constructor(private authService:AuthServiceService) {
    this.globalVariable=this.authService.getDecodedToken();
 
   }
}
