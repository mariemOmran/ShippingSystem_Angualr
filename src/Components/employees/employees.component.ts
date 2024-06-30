import { EmployeeService } from './../../Services/employee.service';
import { Component, ViewChild } from '@angular/core';
import { PanelModule } from 'primeng/panel';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Table, TableModule } from 'primeng/table';
 
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [InputSwitchModule,CommonModule,FormsModule,PanelModule,CardModule,ButtonModule ,TableModule, TagModule, IconFieldModule, InputTextModule, InputIconModule, MultiSelectModule, DropdownModule, HttpClientModule, CommonModule],
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
