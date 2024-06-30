import { Table } from 'primeng/table';
import { EmployeeService } from '../../AbdallahServices/employee.service';
import { TableSharedModule } from '../../shared/TableShared.module';
import { Component, ViewChild } from '@angular/core';
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




 constructor(public EmpService:EmployeeService) {
  
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


  onSwitchChange(event: any) {
    console.log('Switch state:', event.checked);
  }

 
}
