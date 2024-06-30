import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  apiURl:string="https://localhost:7270/api/Role"

  constructor(private httpClient:HttpClient) { }

   GetAllRoles() {
    return this.httpClient.get(`${this.apiURl}/allRoles`);
  }
  AddRole(Name:string):Observable<any>{
    return this.httpClient.post<string>(`${this.apiURl}/AddRole/${Name}`,null);

  }

  DeleteRole(id:number):Observable<any> {
    return this.httpClient.delete<any>(`${this.apiURl}/deleteRole/${id}` );
  }

  GetByID(id:number) :Observable<any>{
    return this.httpClient.get(`${this.apiURl}/GetRole/${id}` );

  }
  UpdateRole(id: number, role: string): Observable<any> {
     
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.put(`${this.apiURl}/UpdateRole/${id}`, JSON.stringify(role), { headers });
  }

  GetPermissions(id: number): Observable<any> {
    return this.httpClient.get(`${this.apiURl}/GetRolePermissions/${id}`);
  }





}
