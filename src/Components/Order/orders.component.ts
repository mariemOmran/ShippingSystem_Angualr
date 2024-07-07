import { Component, OnInit, ViewChild } from '@angular/core';
import { TableSharedModule } from '../../shared/TableShared.module';
import { Table } from 'primeng/table';
import { OrderServiceService } from '../../Services/order-service.service';
import { RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [TableSharedModule,RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})
export class OrdersComponent implements OnInit {


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
Delete(id:number){
this.orderService.deleteOrder(id).subscribe({
  next:(data)=>console.log(data),
  error:(err)=>{console.log(err);
    this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'حدث خطأ أثناء الحذف' });
  },
  complete:()=>{
    this.Orders=this.Orders.filter((e:any)=>e.id!=id)
        this.messageService.add({ severity: 'info', summary: 'تم الحفظ', detail: 'تم حذف الطلب ' });
  }
})
}

}
