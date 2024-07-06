 
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TableSharedModule } from '../../shared/TableShared.module';
import { Table } from 'primeng/table';
import { OrderServiceService } from '../../Services/order-service.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { DialogComponent } from './dialog/dialog.component';
import { PdfGeneratorService } from '../../Services/pdf-generator.service';
import { GlobalService } from '../../Services/global.service';
 


 
@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [TableSharedModule,RouterLink,DialogComponent],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css'
})

export class OrdersComponent implements OnInit {


  Orders:any=[];
  loading: boolean = true;
  @ViewChild('dt2') dt2!: Table;
  @ViewChild('tableRow', { static: false }) tableRow!: ElementRef;
  searchValue: string | undefined;
  orderId:number = 0;
 

  permissions:any =[];
RoleName :string =''
 
 

  statuses: { label: string; value: string }[] = [];
  constructor(private orderService:OrderServiceService,
              private messageService:MessageService,
              private globalService:GlobalService,
              private pdfService: PdfGeneratorService,
              private activeRoute:ActivatedRoute
            ) {
 
              this.RoleName=this.globalService.globalVariable.roleName;
              this.globalService.rolePermissions$.subscribe((permissions) => {
               this.permissions = permissions.filter((permission: any) => permission.entityName == "Orders");
             });

  }

  ngOnInit(): void {
this.GetAll();
  
    this.getStatuses();
 


console.log(this.permissions)
   
  }



GetAll(){
  // this.orderService.getAllOrders().subscribe({
  //   next:(data)=>{this.Orders=data ; console.log(data)},
  //   error:(err)=>console.log(err),
  //   complete: ()=>this.loading=false
  // }) 
  this.orderService.getAllOrdersForMercahnt(Number(this.globalService.globalVariable.id)).subscribe({
    next:(data)=>{this.Orders=data ;},
    error:(err)=>console.log(err),
    complete: ()=>this.loading=false
  })

}

getStatuses(){
  this.orderService.getAllOrderStatuses().subscribe({
    next:(data:any)=>{
      
    
      this.statuses = data.map((status:any) => ({
        label: status,
        value: status.toLowerCase().replace(/\s+/g, '')
      }));
    
 
    },
    error:(err)=>console.log(err),
  })
}


  printTableRowAsPdf() {
    const rowElement = this.tableRow.nativeElement;
    this.pdfService.generatePdfFromTableRow(rowElement);
  }


  changeIdStatus(id:number){
    this.orderId = id;
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

updateOrders(){
  this.orderService.getAllOrders().subscribe({
    next:(data)=>{this.Orders=data ; console.log(data)},
    error:(err)=>console.log(err),
    complete: ()=>this.loading=false
  })
}

PrintPagePDF(){
  window.print();
}

}
