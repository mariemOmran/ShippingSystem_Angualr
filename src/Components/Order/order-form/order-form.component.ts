import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, FormArray, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
<<<<<<< HEAD
import { Iorder } from '../../../Models/iorder';
import { HttpClient } from '@angular/common/http';
import { OrderServiceService } from '../../../Services/order-service.service';
import { IgovernmentID } from '../../../Models/igovernment-id';
import { TableSharedModule } from '../../../shared/TableShared.module';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [InputSwitchModule, TableModule, CommonModule, InputTextModule, ReactiveFormsModule,TableSharedModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
=======
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
>>>>>>> parent of b45438c (add_order)
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
<<<<<<< HEAD

  constructor(private fb: FormBuilder,private http:HttpClient,private orderService:OrderServiceService) {
    this.orderForm = this.fb.group({
      clientName: ['', Validators.required],
      status: ['', Validators.required],
      totalPrice: ['', Validators.required],
      totalWeight: ['', Validators.required],
=======
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
>>>>>>> parent of b45438c (add_order)
      phoneOne: ['', Validators.required],
      phoneTwo: [''],
      email: ['', Validators.required],
      notes: [''],
      streetAndVillage: ['', Validators.required],
<<<<<<< HEAD
      merchantID: ['', Validators.required],
      shippingTypeID: ['', Validators.required],
      paymentTypeID: ['', Validators.required],
      branchID: ['', Validators.required],
      products: this.fb.array([]),
      ifVillage: ['', Validators.required],
      deliveryPlace: ['', Validators.required],
      governmentID: ['', Validators.required],
      cityID: ['', Validators.required],
=======
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
>>>>>>> parent of b45438c (add_order)
      merchantPhone: [''],
      merchantAddress: ['']
    });



<<<<<<< HEAD

=======
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
>>>>>>> parent of b45438c (add_order)
    this.orderService.getAllGovernmentTocreateOrder().subscribe({
      next:(data)=>{
        console.log(data);
        this.governments= data;
        console.log("governments"+this.governments)
      }
<<<<<<< HEAD
    })
   
=======
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
>>>>>>> parent of b45438c (add_order)
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

<<<<<<< HEAD


  AddNewOrder() {
    // Handle form submission
    if (this.orderForm.valid) {
      const orderData = this.orderForm.value;
      // Post orderData to API
    }
  }
=======
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
>>>>>>> parent of b45438c (add_order)
}
