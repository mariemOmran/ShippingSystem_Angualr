import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {jwtDecode} from 'jwt-decode'; // Import jwt_decode correctly
import { ILogin } from '../Models/i-login';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http:HttpClient) { }

  userData: any = null;
  
  login(createLoginDTO:ILogin,role:string): Observable<string> {
    return this.http.post<string>(`https://localhost:7270/api/Login/${role}`,createLoginDTO, { responseType: 'text' as 'json' });
  }
  decodeUserData() {
    const encodedToken = localStorage.getItem('token');
    if (encodedToken) {
      const decodedToken: any = jwtDecode(encodedToken); // Correct usage
      console.log(decodedToken);
      this.userData = decodedToken;
    }
  }

  getDecodedToken() {
    const encodedToken = localStorage.getItem('userToken');
    if (encodedToken) {
      return jwtDecode(encodedToken); // Correct usage
    }
    return null;
  }

  getToken(): string | null{
    return localStorage.getItem('token');
  }

  get getheader():HttpHeaders{
    return new HttpHeaders({
      'Content-Type': 'application/json' ,
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  }
}
