import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule ,FormArray, ReactiveFormsModule, Validators} from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { Iorder } from '../../../Models/iorder';
@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [InputSwitchModule,TableModule,CommonModule,InputTextModule,ReactiveFormsModule],
  templateUrl: './order-form.component.html',
  styleUrl: './order-form.component.css'
})
export class OrderFormComponent {
  Check_valiage_street:any;
  count:number=1;
  newProdut:any[]=[]
  orderForm:FormGroup;
  addRow() {
    
    this.newProdut.push({ id: ++this.count });
  }
  deleteRow(id:number){
    this.newProdut=  this.newProdut.filter(e=>e.id!=id);
  }

  constructor(private fb:FormBuilder){
    this.orderForm =  this.fb.group({
    clientName:['',Validators.required],
    status:['',Validators.required],//not mapping in html
    totalPrice:['',Validators.required],
    totalWeight:['',Validators.required],
    phoneOne:['',Validators.required],
    phoneTwo:['',],
    email:['',Validators.required],
    notes:[''],
    streetAndVillage:['',Validators.required],
    merchantID:['',Validators.required],//not mapping in html
    shippingTypeID:['',Validators.required],//not mapping in html
    paymentTypeID:['',Validators.required],// not mapping in html 
    products:fb.array([]),//not map it in html 
    ifVillage:['',Validators.required]
    })
  }

  //get value of inputs to check if input valid or not 
  get ClientName(){
    return this.orderForm.get('clientName');
  }
  get Status(){
    return this.orderForm.get('status');
  }
  get TotalPrice(){
    return this.orderForm.get('totalPrice');
  }
  get TotalWeight(){
    return this.orderForm.get('totalWeight');
  }
  get PhoneOne(){
    return this.orderForm.get('phoneOne');
  }
  get PhoneTwo(){
    return this.orderForm.get('phoneTwo');
  }
  get Email(){
    return this.orderForm.get('email');
  }
  get Notes(){
    return this.orderForm.get('notes');
  }
  get StreetAndVillage(){
    return this.orderForm.get('streetAndVillage');
  }
  get MerchantID(){
    return this.orderForm.get('merchantID');
  }
  get ShippingTypeID(){
    return this.orderForm.get('shippingTypeID');
  }
  get PaymentTypeID(){
    return this.orderForm.get('paymentTypeID');
  }
  // this i am not sure
  get Products(){
    return this.orderForm.get('products');
  }
  get IfVillage(){
    return this.orderForm.get('ifVillage');
  }
// post data to api
  AddNewOrder(){

  }
  
//   // governments is an arrya of object contain name and id 
//   governments:any;
// // cities is an array of objects contain name and id based on select government
//   cities:any;
// // where the client will revcive order on the branch or at home
//   deliveryPlace:any;
//   // get type from db is an array of object contain  name and price and id
//   ShippingType:any;
// // is an array of branches in db 
//   branch:any;
//   formData: FormGroup
//   constructor(private fb:FormBuilder){
//     this.formData=fb.group({

//     })
//   }
}
