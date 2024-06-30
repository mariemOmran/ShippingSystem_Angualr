import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../Services/order.service';
import { OrderCounts } from '../../../Models/order-counts';

@Component({
  selector: 'app-order-count',
  standalone: true,
  imports: [],
  templateUrl: './order-count.component.html',
  styleUrl: './order-count.component.css',
})
export class OrderCountComponent implements OnInit {
  ordersCounts: OrderCounts[] = [];
  constructor(private orderService: OrderService) {}
  ngOnInit(): void {
    this.orderService.GetAllOrderCounts().subscribe({
      next: (data) => {
        this.ordersCounts = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.orderService.GetAllMerchantOrderCounts(1).subscribe({
      next: (data) => {
        this.ordersCounts = data;
        console.log(data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
