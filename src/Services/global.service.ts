import { Role } from './../Models/IRole';
import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { RolesService } from './roles.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  public globalVariable: any = 'Initial Value';
  private rolePermissionsSubject = new BehaviorSubject<any[]>([]);
  public rolePermissions$ = this.rolePermissionsSubject.asObservable();
  constructor(private authService:AuthServiceService ,private roleService:RolesService) {
    this.globalVariable=this.authService.getDecodedToken();

    
    this.roleService.GetPermissions(Number(this.globalVariable.roleId)).subscribe({
      next: (data) => {
        this.rolePermissionsSubject.next(data);
        console.log(this.rolePermissionsSubject.getValue());
      },
      error: (err) => console.log(err)
    });
 
   }
 

    
}
