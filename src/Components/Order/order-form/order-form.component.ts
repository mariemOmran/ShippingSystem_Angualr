import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { Iorder } from '../../../Models/iorder';
import { HttpClient } from '@angular/common/http';
import { OrderServiceService } from '../../../Services/order-service.service';
import { IgovernmentID } from '../../../Models/igovernment-id';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [InputSwitchModule, TableModule, CommonModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent {
  count: number = 1;
  newProdut: any[] = [];
  governments?: IgovernmentID[];
  cities: any[] = [{ id: 1, name: 'Nasr City' }, { id: 2, name: 'Heliopolis' }];
  shippingTypes: any[] = [{ id: 1, name: 'Standard' }, { id: 2, name: 'Express' }];
  paymentTypes: any[] = [{ id: 1, name: 'Cash' }, { id: 2, name: 'Card' }];
  branches: any[] = [{ id: 1, name: 'Branch 1' }, { id: 2, name: 'Branch 2' }];
  orderForm: FormGroup;

  constructor(private fb: FormBuilder,private http:HttpClient,private orderService:OrderServiceService) {
    this.orderForm = this.fb.group({
      clientName: ['', Validators.required],
      status: ['', Validators.required],
      totalPrice: ['', Validators.required],
      totalWeight: ['', Validators.required],
      phoneOne: ['', Validators.required],
      phoneTwo: [''],
      email: ['', Validators.required],
      notes: [''],
      streetAndVillage: ['', Validators.required],
      merchantID: ['', Validators.required],
      shippingTypeID: ['', Validators.required],
      paymentTypeID: ['', Validators.required],
      branchID: ['', Validators.required],
      products: this.fb.array([]),
      ifVillage: ['', Validators.required],
      deliveryPlace: ['', Validators.required],
      governmentID: ['', Validators.required],
      cityID: ['', Validators.required],
      merchantPhone: [''],
      merchantAddress: ['']
    });




    this.orderService.getAllGovernmentTocreateOrder().subscribe({
      next:(data)=>{
        console.log(data);
        this.governments= data;
        console.log("governments"+this.governments)
      }
    })
   
  }

  
  addRow() {
    this.newProdut.push({ id: ++this.count });
  }

  deleteRow(id: number) {
    this.newProdut = this.newProdut.filter(e => e.id != id);
  }

  get ClientName() {
    return this.orderForm.get('clientName');
  }
  get Status() {
    return this.orderForm.get('status');
  }
  get TotalPrice() {
    return this.orderForm.get('totalPrice');
  }
  get TotalWeight() {
    return this.orderForm.get('totalWeight');
  }
  get PhoneOne() {
    return this.orderForm.get('phoneOne');
  }
  get PhoneTwo() {
    return this.orderForm.get('phoneTwo');
  }
  get Email() {
    return this.orderForm.get('email');
  }
  get Notes() {
    return this.orderForm.get('notes');
  }
  get StreetAndVillage() {
    return this.orderForm.get('streetAndVillage');
  }
  get MerchantID() {
    return this.orderForm.get('merchantID');
  }
  get ShippingTypeID() {
    return this.orderForm.get('shippingTypeID');
  }
  get PaymentTypeID() {
    return this.orderForm.get('paymentTypeID');
  }
  get Products() {
    return this.orderForm.get('products');
  }
  get IfVillage() {
    return this.orderForm.get('ifVillage');
  }
  get DeliveryPlace() {
    return this.orderForm.get('deliveryPlace');
  }
  get GovernmentID() {
    return this.orderForm.get('governmentID');
  }
  get CityID() {
    return this.orderForm.get('cityID');
  }
  get MerchantPhone() {
    return this.orderForm.get('merchantPhone');
  }
  get MerchantAddress() {
    return this.orderForm.get('merchantAddress');
  }



  AddNewOrder() {
    // Handle form submission
    if (this.orderForm.valid) {
      const orderData = this.orderForm.value;
      // Post orderData to API
    }
  }
}
