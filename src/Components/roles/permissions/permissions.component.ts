import { Component, OnInit, ViewChild } from '@angular/core';
import { TableSharedModule } from '../../../shared/TableShared.module';
import { RolesService } from '../../../Services/roles.service';
import { Table } from 'primeng/table';
import { ActivatedRoute, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-permissions',
  standalone: true,
  imports: [TableSharedModule, RouterLinkActive],
  templateUrl: './permissions.component.html',
  styleUrl: './permissions.component.css',
})
export class PermissionsComponent implements OnInit {
  Permissions: any = [];
  RoleID: any;
  loading = false;
  @ViewChild('dt2') dt2!: Table;
  searchValue: string | undefined;
  /**
   *
   */
  constructor(
    private roleService: RolesService,
    public activeRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.RoleID = this.activeRoute.snapshot.params['id'];
    this.roleService.GetPermissions(this.RoleID).subscribe({
      next: (data) => {
        console.log(data);
        this.Permissions = data;
      },
      error: (err) => console.log(err),
    });
    console.log(this.RoleID);
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
  onSwitchChange(event: any, entityId: number) {
    console.log('Switch state:', entityId, event.checked);
  }
}
