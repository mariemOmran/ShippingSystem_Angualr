import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { OrderServiceService } from '../../../Services/order-service.service';
import { MerchantService } from '../../../Services/merchant.service';
import { IgovernmentID } from '../../../Models/igovernment-id';
import { IcityID } from '../../../Models/icity-id';
import { IShippingTypeID } from '../../../Models/i-shipping-type-id';
import { IPaymentTypeID } from '../../../Models/i-payment-type-id';
import { IbranchID } from '../../../Models/ibranch-id';
import { IdeliveryType } from '../../../Models/idelivery-type';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { InewOrder } from '../../../Models/inew-order';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css'],standalone: true,
  imports: [
    InputSwitchModule,
    TableModule,
    CommonModule,
    InputTextModule,
    ReactiveFormsModule,
    CardModule , // Add CardModule here
    
  ]
})
export class OrderFormComponent implements OnInit {
  count: number = 1;
  newProducts: any[] = [];
  governments: IgovernmentID[] = [];
  cities: IcityID[] = [];
  deliveryTypes: IdeliveryType[] = [];
  shippingTypes: IShippingTypeID[] = [];
  paymentTypes: IPaymentTypeID[] = [];
  branches: IbranchID[] = [];
  orderForm: FormGroup;
  totalPriceOfProducts: number = 0;
  totalWeightProducts: number = 0;
  merchant: any = {}; // Initialize merchant object
  merchantID: number = 1; // Example merchant ID
  order!:InewOrder

  constructor(private fb: FormBuilder, private orderService: OrderServiceService, private merchantService: MerchantService) {
    this.orderForm = this.fb.group({
      clientName: ['', ],
      status: ['', Validators.required],
      totalPrice: [this.totalPriceOfProducts, Validators.required],
      totalWeight: [this.totalWeightProducts, Validators.required],
      phoneOne: ['', Validators.required],
      phoneTwo: [''],
      email: ['', [Validators.required, Validators.email]],
      notes: [''],
      streetAndVillage: ['', Validators.required],
      merchantID: [this.merchantID, Validators.required], // Example merchant ID
      shippingTypeID: ["default", [this.defaultSelectionValidator]],
      paymentTypeID: ["default", [this.defaultSelectionValidator]],
      branchID: ["default", [this.defaultSelectionValidator]],
      products: this.fb.array([]),
      ifVillage: ['', Validators.required],
      deliveryPlace: ['', Validators.required],
      governmentID: ["default", [this.defaultSelectionValidator]],
      cityID: ["default", [this.defaultSelectionValidator]],
      deliveryTypeID: ["default", [this.defaultSelectionValidator]],
      merchantPhone: [''],
      merchantAddress: ['']
    });

    this.loadInitialData();
  }

  ngOnInit(): void {
    this.orderForm.get('governmentID')?.valueChanges.subscribe({
      next: governmentID => {
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

    this.merchantService.getMerchantAccountById(this.merchantID).subscribe({
      next: (data: any) => {
        this.merchant = data || {}; // Assign merchant data if available
        this.updateMerchantData();
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  updateMerchantData(): void {
    // Update form controls with merchant data
    this.orderForm.patchValue({
      merchantPhone: this.merchant.phone || '',
      merchantAddress: this.merchant.address || ''
    });
  }

  loadInitialData(): void {
    this.orderService.getAllGovernmentTocreateOrder().subscribe({
      next: (data: any) => {
        this.governments = data as IgovernmentID[];
      },
      error: (error) => {
        console.log(error);
      }
    });

    this.orderService.getAllPaymentType().subscribe({
      next: (data: any) => {
        this.paymentTypes = data as IPaymentTypeID[];
      },
      error: (error) => {
        console.log(error);
      }
    });

    this.orderService.getAllShippingType().subscribe({
      next: (data: any) => {
        this.shippingTypes = data as IShippingTypeID[];
      },
      error: (error) => {
        console.log(error);
      }
    });

    this.orderService.getAllBranch().subscribe({
      next: (data: any) => {
        this.branches = data as IbranchID[];
      },
      error: (error) => {
        console.log(error);
      }
    });
    this.orderService.getAllDeliveryTypes().subscribe({
      next:(data)=>{
        this.deliveryTypes=data as IdeliveryType[];
      }
    });
  }

  loadCities(governmentID: number): void {
    this.orderService.getAllCitiesBasedOnGovernments(governmentID).subscribe({
      next: (data: any) => {
        this.cities = data as IcityID[];
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  defaultSelectionValidator(control: any) {
    return control.value === "default" ? { defaultSelected: true } : null;
  }

  addRow() {
    if (this.isProductValid()) {
      this.newProducts.push({ id: this.count++ });
      this.Products.push(this.createProductFormGroup());
      this.updateTotals();
    } else {
      alert('Please fill in the current product details before adding a new one.');
    }
  }

  deleteRow(index: number) {
    this.newProducts.splice(index, 1);
    this.Products.removeAt(index);
    this.updateTotals();
  }

  isProductValid(): boolean {
    const productFormArray = this.Products as FormArray;
    if (productFormArray.length === 0) return true;

    const lastProduct = productFormArray.at(productFormArray.length - 1) as FormGroup;
    return lastProduct.valid;
  }

  updateTotals() {
    this.totalPriceOfProducts = 0;
    this.totalWeightProducts = 0;
    
    // Cast Products to FormArray
    const productFormArray = this.Products as FormArray;
  
    // Iterate through each form group in the FormArray
    productFormArray.controls.forEach((control: AbstractControl<any>) => {
      if (control instanceof FormGroup) { // Ensure control is FormGroup
        this.totalPriceOfProducts += control.get('price')?.value || 0;
        this.totalWeightProducts += control.get('weight')?.value || 0;
      }
    });
  
    // Update form with calculated totals
    this.orderForm.patchValue({
      totalPrice: this.totalPriceOfProducts,
      totalWeight: this.totalWeightProducts
    });
  }

  createProductFormGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      weight: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(1)]]
    });
  }

  trackByIndex(index: number): number {
    return index;
  }

  get Products(): FormArray {
    return this.orderForm.get('products') as FormArray;
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

  get BranchID() {
    return this.orderForm.get('branchID');
  }

  get DeliveryTypeID() {
    return this.orderForm.get('deliveryTypeID');
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
     // Mark all fields as touched to trigger validation messages
  this.orderForm.markAllAsTouched();
  this.order = this.orderForm.value as InewOrder;
  this.orderService.createOrder(this.order).subscribe({
    next:(data)=>{
      console.log(data);
    },error:(err)=>{
      console.log(err)
    }
  })
  // Check if the form is valid
  if (this.orderForm.valid) {
    console.log('Form is valid');
    
    
    console.log(this.orderForm.value);
    
    // Proceed with form submission logic
  } else {
    console.log('Form has validation errors:', this.orderForm);
  }
  }
}
