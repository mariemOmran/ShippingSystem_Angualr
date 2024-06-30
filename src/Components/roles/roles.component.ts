import { Table } from 'primeng/table';

import { TableSharedModule } from '../../shared/TableShared.module';
import { Component, ViewChild } from '@angular/core';
import { RolesService } from '../../Services/roles.service';

import { DialogComponent } from './dialog/dialog.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [TableSharedModule, DialogComponent, RouterLink],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css',
})
export class RolesComponent {
  Roles: any = [];
  DialogId = 0;
  loading = false;
  @ViewChild('dt2') dt2!: Table;
  searchValue: string | undefined;

  constructor(public roleService: RolesService) {}

  ngOnInit() {
    this.GetAll();
  }
  changeIdVal(id: number) {
    this.DialogId = id;
  }
  clear(table: Table) {
    table.clear();
    this.searchValue = '';
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
      },
      error: (err) => console.log(err),
    });
  }

  Delete(id: number) {
    this.roleService.DeleteRole(id).subscribe({
      next: (data: any) => {
        this.Roles = this.Roles.filter((i: any) => i.id !== data.roleId);
      },
      error: (err) => console.log(err),
    });
  }

  // Event handler for roleAdded event emitted by DialogComponent
  async onRoleAdded() {
    this.roleService.GetAllRoles().subscribe({
      next: (data) => {
        this.Roles = data;
      },
      error: (err) => console.log(err),
    });
  }
}
