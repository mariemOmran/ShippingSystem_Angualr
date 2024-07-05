import { Component, ViewChild } from '@angular/core';
import { TableSharedModule } from '../../shared/TableShared.module';
import { OrderServiceService } from '../../Services/order-service.service';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [TableSharedModule],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent {

  Orders:any=[];
  loading: boolean = true;
  @ViewChild('dt2') dt2!: Table;
  searchValue: string | undefined;

  constructor(private orderService:OrderServiceService,private messageService:MessageService) {
    
  }

  ngOnInit(): void {
    this.orderService.getAllOrders().subscribe({
      next:(data)=>{this.Orders=data ; console.log(data)},
      error:(err)=>console.log(err),
      complete: ()=>this.loading=false
    })
  }








  clear(table: Table) {
    table.clear();
    this.searchValue="";
}

onInput(event: Event) {
  const inputElement = event.target as HTMLInputElement;
  if (this.dt2) {
    this.dt2.filterGlobal(inputElement.value, 'contains');
  }
}
}
