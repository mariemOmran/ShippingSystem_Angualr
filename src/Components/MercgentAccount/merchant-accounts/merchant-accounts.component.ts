import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MerchantService } from '../../../Services/merchant.service';

@Component({
  selector: 'app-merchant-accounts',
  standalone: true,
  imports: [CommonModule,RouterLink , RouterLinkActive],
  templateUrl: './merchant-accounts.component.html',
  styleUrl: './merchant-accounts.component.css'
})



export class MerchantAccountsComponent implements OnInit {
  merchantAccounts: any[] = [];

  constructor(private _MerchantService: MerchantService) {}

  ngOnInit(): void {
    this._MerchantService.getMerchantAccounts().subscribe(
      data => {
        this.merchantAccounts = data; 
        console.log(data);
      },
      error => {
        console.error('Error fetching merchant accounts', error);
      }
    );
  }
}