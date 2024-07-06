import { Component, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
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
  toggleSidebar() {
    console.log("ok")
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  /**
   *
   */
  constructor(private globalService:GlobalService) {
    this.roleName=this.globalService.globalVariable.roleName;
  }

  // @HostListener('window:resize', ['$event'])
  // onResize(event: any) {
  //   if (event.target.innerWidth > 768) {
  //     this.isSidebarVisible = true;
  //   } else {
  //     this.isSidebarVisible = false;
  //   }
  // }
}
