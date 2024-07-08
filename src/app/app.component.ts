import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from '../Components/layout/layout.component';
import { LoginComponent } from '../Components/login/login.component';
import { GlobalService } from '../Services/global.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,LayoutComponent,LoginComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent     {

  title = 'ShippingSystem_Angualr';
 

  
}
