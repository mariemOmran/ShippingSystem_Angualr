import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { Iorder } from '../../../Models/iorder';
import { IgovernmentID } from '../../../Models/igovernment-id';
import { IcityID } from '../../../Models/icity-id';
import { IShippingTypeID } from '../../../Models/i-shipping-type-id';
import { IPaymentTypeID } from '../../../Models/i-payment-type-id';
import { IBranch } from '../../../Models/i-branch';
import { IbranchID } from '../../../Models/ibranch-id';
import { OrderServiceService } from '../../../Services/order-service.service';

export interface InewOrder {
    clientName:string,
    status:string,
    totalPrice:number,
    totalWeight:number,
    phoneOne:string,
    phoneTwo:string,
    email:string,
    notes:string,
    streetAndVillage:string,
    ifVillage:boolean,
    merchantID:number,
    shippingTypeID:number,
    paymentTypeID:number,
    products:Product[],
}

export interface Product {
    name: string,
    price: number,
    weight: number,
    quantity: number
}

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [InputSwitchModule, TableModule, CommonModule, InputTextModule, ReactiveFormsModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent implements OnInit {
  count: number = 1;
  newProdut: any[] = [];
  governments: IgovernmentID[] = [];
  cities: IcityID[] = [];
  shippingTypes: IShippingTypeID[] = [];
  paymentTypes: IPaymentTypeID[] = [];
  branches: IbranchID[] = [];
  orderForm: FormGroup;

  constructor(private fb: FormBuilder, private orderService: OrderServiceService) {
    this.orderForm = this.fb.group({
      clientName: ['', Validators.required],
      status: ['', Validators.required],
      totalPrice: ['', Validators.required],
      totalWeight: ['', Validators.required],
      phoneOne: ['', Validators.required],
      phoneTwo: [''],
      email: ['', [Validators.required, Validators.email]],
      notes: [''],
      streetAndVillage: ['', Validators.required],
      merchantID: ['', Validators.required],
      shippingTypeID: ["default", [this.defaultSelectionValidator]],
      paymentTypeID: ["default", [this.defaultSelectionValidator]],
      branchID: ["default", [this.defaultSelectionValidator]],
      products: this.fb.array([]),
      ifVillage: ['', Validators.required],
      deliveryPlace: ['', Validators.required],
      governmentID: ["default", [this.defaultSelectionValidator]],
      cityID: ["default", [this.defaultSelectionValidator]],
      merchantPhone: [''],
      merchantAddress: ['']
    });

    this.orderService.getAllGovernmentTocreateOrder().subscribe({
      next: (data) => {
        this.governments = data as IgovernmentID[];
        console.log(this.governments);
      },
      error: (error) => {
        console.log(error);
      }
    });

    this.orderService.getAllPaymentType().subscribe({
      next: (data) => {
        this.paymentTypes = data as IPaymentTypeID[];
        console.log(this.paymentTypes);
      },
      error: (error) => {
        console.log(error);
      }
    });

    this.orderService.getAllShippingType().subscribe({
      next: (data) => {
        this.shippingTypes = data as IShippingTypeID[];
        console.log(this.shippingTypes);
      },
      error: (error) => {
        console.log(error);
      }
    });

    this.orderService.getAllBranch().subscribe({
      next: (data) => {
        this.branches = data as IbranchID[];
        console.log(this.shippingTypes);
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  defaultSelectionValidator(control: any) {
    return control.value === "default" ? { defaultSelected: true } : null;
  }

  ngOnInit(): void {
    // Listen for changes on governmentID
    this.orderForm.get('governmentID')?.valueChanges.subscribe({
      next: governmentID => {
        console.log("next subscribe ")
        console.log(governmentID)
        if (governmentID) {
          this.loadCities(governmentID);
          this.orderForm.get('cityID')?.enable();
        } else {
          this.orderForm.get('cityID')?.disable();
          this.cities = [];
        }
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  loadCities(governmentID: number): void {
    // Fetch cities based on governmentID
    this.orderService.getAllCitiesBasedOnGovernments(governmentID).subscribe({
      next: (data) => {
        this.cities = data as IcityID[];
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  addRow() {
    if (this.isProductValid()) {
      this.newProdut.push({ id: ++this.count });
      this.Products.push(this.createProductFormGroup());
    } else {
      alert('Please fill in the current product details before adding a new one.');
    }
  }

  deleteRow(index: number) {
    this.newProdut = this.newProdut.filter(e => e.id != index + 1);
    this.Products.removeAt(index);
  }

  isProductValid(): boolean {
    const productFormArray = this.Products as FormArray;
    if (productFormArray.length === 0) return true;

    const lastProduct = productFormArray.at(productFormArray.length - 1) as FormGroup;
    return lastProduct.valid;
  }

  createProductFormGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      weight: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(1)]]
    });
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
    return this.orderForm.get('products') as FormArray;
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

  get BrachID() {
    return this.orderForm.get('branchID');
  }

  AddNewOrder() {
    // Handle form submission
    if (this.orderForm.valid) {
      const orderData = this.orderForm.value;
      // Post orderData to API
    }
  }
}
