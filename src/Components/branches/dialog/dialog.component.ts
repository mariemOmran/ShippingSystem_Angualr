import { Component, EventEmitter, Input, OnInit, Output, ViewChild,ElementRef, OnChanges, SimpleChanges  } from '@angular/core';
import { TableSharedModule } from '../../../shared/TableShared.module';
import { BranchesService } from '../../../Services/branches.service';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IBranch } from '../../../Models/i-branch';
declare var bootstrap: any;
@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [TableSharedModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent implements OnInit ,OnChanges {
  @Input() id = 0;
  Title:string='';
  @Output() branchAdded: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('exampleModal') exampleModal!: ElementRef;
  branchObj:IBranch={name:"",status:true,governmentID:1};

  constructor(private branchService: BranchesService, public router:Router,private messageService: MessageService) {
  
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.id != 0){
      this.branchService.GetByID(this.id).subscribe({
        next: (data) => {
          this.branchObj.name=data.name;
          this.branchObj.governmentID=data.governmentID;
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'حدث خطأ ، حاول مره اخرى' });

        }
      });
    }
  }
  

  
  ngOnInit() {
  
  }

  branchControl() {
    if (this.id == 0) {
      this.branchService.AddBranch(this.branchObj).subscribe({
        next: (data) => {
          console.log('branch added:', data);
          this.branchAdded.emit();
          this.messageService.add({ severity: 'success', summary: 'تم الحفظ', detail: 'تم إضافة الفرع ' });

          this.closeModal();
        },
        error: (err) => {
          console.log(err);
          this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'حدث خطأ أثناء الحفظ' });
          
        },     complete:()=>{this.id=0,this.branchObj.name=""}
      });
    } else {
      this.branchService.UpdateBranch(this.id, this.branchObj).subscribe({
        
        next: (data) => {
          console.log('Role Updated:', data);
        
          this.branchAdded.emit();
          this.messageService.add({ severity: 'success', summary: 'تم الحفظ', detail: 'تم تعديل الفرع ' });

          this.closeModal();
        },
        error: (err) => {
          this.id==0;
          this.messageService.add({ severity: 'error', summary: 'خطأ', detail: 'حدث خطأ أثناء الحفظ' });

          console.log(err);
        },
        complete:()=>{this.id=0,this.branchObj.name=""}
      });
    }
  }


  closeModal() {
    const modalElement = this.exampleModal.nativeElement;
    const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
   
    console.log(this.id)
    modal.hide();
  }
}
