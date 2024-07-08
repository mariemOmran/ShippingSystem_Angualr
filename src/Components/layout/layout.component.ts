import { Component, HostListener } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { AuthServiceService } from '../../Services/auth-service.service';
import { GlobalService } from '../../Services/global.service';
 

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,NavbarComponent,RouterLink, RouterLinkActive,CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  isSidebarVisible = false;
roleName=''

permissions: { [key: string]: boolean } = {};
permissionsKeys: string[] = [];
  toggleSidebar() {
    console.log("ok")
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  /**
   *
   */
  constructor(private globalService:GlobalService,private router:Router) {
    this.roleName=this.globalService.globalVariable.roleName;
    this.permissions = this.globalService.AllReadPermissons();
    this.permissionsKeys = Object.keys(this.permissions);
    console.log(this.permissions);
    
  }

 
  logOut(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('login');
  }
}
