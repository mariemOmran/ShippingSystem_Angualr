import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '../../../Service/delivery.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-delivery-accounts',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive, InputSwitchModule,FormsModule],
  templateUrl: './delivery-accounts.component.html',
  styleUrl: './delivery-accounts.component.css'
})
export class DeliveryAccountsComponent implements OnInit {

  constructor(private _DeliveryService : DeliveryService){ }
  
  deliveryAccounts :any[]=[];

  ngOnInit(): void {
    this._DeliveryService.getDeliveryAccounts().subscribe({
      next:(Response) =>{
       // console.log(Response)
        this.deliveryAccounts=Response;
       // console.log(this.deliveryAccounts);
      }
    })
  }
}
