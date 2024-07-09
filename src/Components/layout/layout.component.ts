import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
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
export class LayoutComponent  implements OnInit {
  isSidebarVisible = false;
 
  toggleSidebar() {
    console.log("ok")
    this.isSidebarVisible = !this.isSidebarVisible;
  }
  
 
  constructor(private globalService:GlobalService,private router:Router) {
   
  
  }
  
  ngOnInit() {
    // Usage example
    this.globalService.loadGlobalData().then((permissions) => {
      console.log('Permissions:', permissions); 
      this.AllPermissions = permissions;
      this.roleName = this.globalService.globalVariable.roleName;
      this.permissions = this.globalService.AllReadPermissons(this.AllPermissions);
      this.permissionsKeys = Object.keys(this.permissions);
      
      console.log(this.roleName);
      console.log(this.permissions);
    }).catch((error) => {
      console.error('Error loading permissions:', error);
    });
  }
  
  // Define your class properties here
  roleName: string = '';
  AllPermissions: any;
  
  permissions: { [key: string]: boolean } = {};
  permissionsKeys: string[] = [];
 
  logOut(){
    localStorage.removeItem('token');
    this.router.navigateByUrl('login');
  }
}
