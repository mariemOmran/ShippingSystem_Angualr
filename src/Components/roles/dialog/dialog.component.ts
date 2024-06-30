import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { TableSharedModule } from '../../../shared/TableShared.module';
import { RolesService } from '../../../Services/roles.service';
import { Router } from '@angular/router';
declare var bootstrap: any;
@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [TableSharedModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent implements OnInit {
  @Input() id = 0;
  @Output() roleAdded: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('exampleModal') exampleModal!: ElementRef;
  roleName: string = '';

  constructor(private roleService: RolesService, public router: Router) {
    console.log(this.id);
  }
  ngOnInit() {
    if (this.id != 0) {
      this.roleService.GetByID(this.id).subscribe({
        next: (data) => console.log(data),
        error: (error) => console.log(error),
      });
    }
  }

  RoleControl() {
    if (this.id == 0) {
      this.roleService.AddRole(this.roleName).subscribe({
        next: (data) => {
          console.log('Role added:', data); // Log the response
          // Emit event to parent component only after successful addition
          this.roleName = '';
          this.roleAdded.emit();
          this.closeModal();
          // this.router.navigate(['/role'])
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else {
      this.roleService.UpdateRole(this.id, this.roleName).subscribe({
        next: (data) => {
          console.log('Role Updated:', data); // Log the response
          // Emit event to parent component only after successful addition
          this.roleAdded.emit();
          this.closeModal();
        },
        error: (err) => console.log(err),
      });
    }
  }

  closeModal() {
    const modalElement = this.exampleModal.nativeElement;
    const modal =
      bootstrap.Modal.getInstance(modalElement) ||
      new bootstrap.Modal(modalElement);
    modal.hide();
  }
}
