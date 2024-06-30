import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-merchant-accounts',
  standalone: true,
  imports: [CommonModule,RouterLink , RouterLinkActive],
  templateUrl: './merchant-accounts.component.html',
  styleUrl: './merchant-accounts.component.css'
})
export class MerchantAccountsComponent {

}
