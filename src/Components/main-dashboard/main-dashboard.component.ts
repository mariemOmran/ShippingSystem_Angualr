import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { OrderServiceService } from '../../Services/order-service.service';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-main-dashboard',
  standalone: true,
  imports: [AccordionModule,CommonModule ,PanelModule ,CardModule ],
  templateUrl: './main-dashboard.component.html',
  styleUrl: './main-dashboard.component.css'
})
export class MainDashboardComponent implements OnInit {
  tabs:any=[];

  
  constructor(private orderService:OrderServiceService) {
    
  }
  ngOnInit(): void {
    this.orderService.getExistedOrderStatuses().subscribe({
      next:(data)=>this.tabs=data,
      error:(err)=>console.log(err)
    })
  }
}
