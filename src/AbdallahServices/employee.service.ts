import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  apiURl:string="https://localhost:7270/api/Employees"

  constructor(private httpclient:HttpClient) { }

  getAllEmployees(){
    return this.httpclient.get(this.apiURl);
  }
}
