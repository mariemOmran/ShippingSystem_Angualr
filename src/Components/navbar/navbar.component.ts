import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { GlobalService } from '../../Services/global.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
 Globalvar:any=''


  
 constructor(private globalService:GlobalService) {
  this.Globalvar=this.globalService.globalVariable;
  console.log(this.Globalvar);
 }
}
