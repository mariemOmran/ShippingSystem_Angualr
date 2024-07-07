import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IBranch } from '../Models/i-branch';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {

  apiURl:string="https://localhost:7270/api/Branch"

  constructor(private httpClient:HttpClient) { }

   GetAllBranches() {
    return this.httpClient.get(`${this.apiURl}`);
  }
  GetByID(id:number) :Observable<any>{
    return this.httpClient.get(`${this.apiURl}/${id}` );

  }
  AddBranch(branchObj:IBranch):Observable<any>{  //branchName, govID
    return this.httpClient.post<string>(`${this.apiURl}`,branchObj);
    // return this.httpClient.post<string>(`${this.apiURl}`/AddBranch/$`{Name}`,null);

  }

  DeleteBranch(id:number):Observable<any> {
    return this.httpClient.delete<any>(`${this.apiURl}/${id}` );
  }

  UpdateBranch(id: number, branchObj:IBranch): Observable<any> {  //governmentID, name , status
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    // const body = JSON.stringify(branchObj);
    console.log(id)
    console.log(branchObj)
    return this.httpClient.put(`${this.apiURl}/${id}`, branchObj,{headers});
    // return this.httpClient.put(`https://localhost:7270/api/Branch/UpdateBranch/${id}`, body,{headers});
  }
  ChangeStatus(id: number): Observable<any> {
    return this.httpClient.get(`${this.apiURl}/changeStatus/${id}`);
  }

}
