import { Role } from './../Models/IRole';
import { Injectable, OnInit } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { RolesService } from './roles.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GlobalService  {
  public globalVariable: any = 'Initial Value';
  public AllPermissions: any = [];

 

  public idForAccount!: number;

  constructor(private authService: AuthServiceService, private roleService: RolesService) {}

  loadGlobalData(): Promise<any> {
    return new Promise((resolve, reject) => {
      if(this.authService.getToken()!==null) {
      this.globalVariable = this.authService.getDecodedToken();
        this.idForAccount = this.globalVariable.id;

      this.roleService.GetPermissions(Number(this.globalVariable.roleId)).subscribe({
        next: (data) => {
          this.AllPermissions = data;
          console.log(this.AllPermissions);
          resolve(true);
        },
        error: (err) => {
          console.log(err);
          reject(err);
        }
      });
    }
    });
  }

  // get getIDAccount(): number {
  //   return this.idForAccount;
  // }

  public getEntitiesPermissions(type: string) {
    return     this.AllPermissions.filter((permission: any) => permission.entityName === type);
     
  
  }

  AllReadPermissons(){
    return this.AllPermissions.reduce((acc:any, permission:any) => {
      acc[permission.entityName] = permission.canRead;
      return acc;
    }, {} as { [key: string]: boolean });
  }
}


 // this.EmployeesPermissions = this.AllPermissions.filter((permission: any) => permission.entityName == "الموظفين");
      // this.MerchantPermissions = this.AllPermissions.filter((permission: any) => permission.entityName == "التجار");

        // private rolePermissionsSubject = new BehaviorSubject<any[]>([]);
  // public rolePermissions$ = this.rolePermissionsSubject.asObservable();