import { Component, OnInit } from '@angular/core';
import { DeliveryService } from '../../../Service/delivery.service';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-delivery-accounts',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
    InputSwitchModule,
    FormsModule,
    TableModule,
    PaginatorModule,
    InputTextModule
  ],
  templateUrl: './delivery-accounts.component.html',
  styleUrls: ['./delivery-accounts.component.css']
})
export class DeliveryAccountsComponent implements OnInit {
  deliveryAccounts: any[] = [];
  totalRecords: number = 0;
  loading: boolean = false;
  first: number = 0;
  rows: number = 10;
  searchValue: string = '';

  constructor(private _DeliveryService: DeliveryService) {}

  ngOnInit(): void {
    this.loadDeliveryAccounts();
  }

  loadDeliveryAccounts(): void {
    this.loading = true;
    this._DeliveryService.getDeliveryAccounts().subscribe({
      next: (response) => {
        this.deliveryAccounts = response;
        this.totalRecords = this.deliveryAccounts.length; 
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading delivery accounts', err);
        this.loading = false;
      }
    });
  }

  
  onSwitchChange(event: any) {
    console.log('Switch state:', event.checked);
  }

  onPageChange(event: any): void {
    this.first = event.first;
    this.rows = event.rows;
  }
}
