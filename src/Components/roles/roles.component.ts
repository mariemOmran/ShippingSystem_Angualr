
import { Table } from 'primeng/table';
 
import { TableSharedModule } from '../../shared/TableShared.module';
import { Component, ViewChild } from '@angular/core';
import { RolesService } from '../../Services/roles.service';
 
import { DialogComponent } from './dialog/dialog.component';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MessageService } from 'primeng/api';
import { GlobalService } from '../../Services/global.service';
 
@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [TableSharedModule,DialogComponent,RouterLink,CommonModule ],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {
  Roles: any = [];
  DialogId = 0;
  loading = true;
  @ViewChild('dt2') dt2!: Table;
  searchValue: string | undefined;
  permissions:any =[];
  constructor(public roleService: RolesService,private messageService: MessageService,    private globalService:GlobalService) {
  
  }

  ngOnInit() {
    this.GetAll();
    
    this.permissions = this.globalService.getEntitiesPermissions("الإعدادات");
console.log(this.permissions)
  }
  changeIdVal(id:number){
    
    this.DialogId=id;
    
  }
  clear(table: Table) {
    table.clear();
    this.searchValue = "";
  }

  onInput(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    if (this.dt2) {
      this.dt2.filterGlobal(inputElement.value, 'contains');
    }
  }

  GetAll() {
    this.roleService.GetAllRoles().subscribe({
      next: (data) => {
        
        this.Roles = data;
        this.loading=false;
      },
      error: (err) => console.log(err)
    });
  }

  Delete(id: number) {
    this.roleService.DeleteRole(id).subscribe({
      next: (data: any) => {
        this.Roles = this.Roles.filter((i: any) => i.id !== data.roleId);
        this.messageService.add({ severity: 'error', summary: 'تم الحذف', detail: 'تم حذف الصلاحية ' });

      },
      error: (err) => console.log(err)
    });
  }

  // Event handler for roleAdded event emitted by DialogComponent
 async onRoleAdded() {
   
  this.roleService.GetAllRoles().subscribe({
    next: (data) => {
      
      this.Roles = data;
    },
    error: (err) => console.log(err)
  });
  }


 
}
