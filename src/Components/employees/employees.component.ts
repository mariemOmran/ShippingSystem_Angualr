import { Table } from 'primeng/table';
import { EmployeeService } from '../../AbdallahServices/employee.service';
import { TableSharedModule } from '../../shared/TableShared.module';
import { Component, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [TableSharedModule],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
  Employees:any=[];

  representatives:any=[];



  loading: boolean = false;
  @ViewChild('dt2') dt2!: Table;
  searchValue: string | undefined;




 constructor(public EmpService:EmployeeService,private messageService:MessageService) {
  
 }
  ngOnInit() {
  this.GetAll();
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


  GetAll(){
    this.EmpService.getAllEmployees().subscribe({
      next: (data)=>{console.log(data); this.Employees=data},
      error:(err)=>console.log(err)
    })   
  }


  onSwitchChange(event: any,id:number) {
    console.log('Switch state:', event.checked);
    this.EmpService.updateEmployeeStatus(id).subscribe({
      next:(data)=>{
        console.log(data);
        this.messageService.add({ severity: 'info', summary: 'تم الحفظ', detail: 'تم تعديل الحالة ' });
      },
      error:(err)=>{console.log(err)
        this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'حدث خطأ أثناء التعديل' });

      }
    })
  }

 
}
