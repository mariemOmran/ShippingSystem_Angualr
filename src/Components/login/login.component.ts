
import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthServiceService } from '../../Services/auth-service.service';
import { emailPasswordValidator } from '../../Validators/emailPasswordValidator';
import { ILogin } from '../../Models/i-login';
import { Router } from '@angular/router';
// import Swiper, { EffectCards, Keyboard, Pagination } from 'swiper';
// import 'swiper/swiper-bundle.css';

// Swiper.use([EffectCards, Keyboard, Pagination]);
declare function initializeSwiper(): void;

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  encapsulation: ViewEncapsulation.None // Use None to allow global styles to be applied
})

export class LoginComponent implements AfterViewInit {
  accObj?:ILogin;
  
  constructor(private authService:AuthServiceService,private router:Router){

  }
  ngAfterViewInit() {
    initializeSwiper();
  }

  empLoginForm: FormGroup = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', [Validators.required])
  }, 
  { asyncValidators: emailPasswordValidator(this.authService,'Employee') });
  
  deliveryLoginForm: FormGroup = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', [Validators.required])
  }, 
  { asyncValidators: emailPasswordValidator(this.authService,'Delivery') });
  
  merchantLoginForm: FormGroup = new FormGroup({
    Email: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', [Validators.required])
  }, 
  { asyncValidators: emailPasswordValidator(this.authService,'Merchant') });




  handleLogin(role:string) {
    // this.isLoading = true;

    if(role=="delivery"){
      const { Email, Password } = this.deliveryLoginForm.value;
      this.accObj={email:Email,password:Password};

      this.authService.login(this.accObj,'Delivery').subscribe({
        next: (res: any) => {
          if(res=="Email Not Valid"){
            this.deliveryLoginForm.get('Email')?.setErrors({ 'invalidEmailLogin': true });
          }
          else if(res=="password Not Valid"){
            this.deliveryLoginForm.get('Password')?.setErrors({ 'invalidPasswordLogin': true });
          }
          else{  //email and password are correct
            const jsonObject = JSON.parse(res);
            localStorage.setItem('token', jsonObject.readLoginDTO.token);
            localStorage.setItem('deliveryid', jsonObject.readLoginDTO.id);
            localStorage.setItem('deliveryName', jsonObject.readLoginDTO.name);
            localStorage.setItem('deliveryRole', jsonObject.readLoginDTO.role);


            this.router.navigate(['/']);
          }
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.deliveryLoginForm.get('Password')?.setErrors({ 'somethingWrong': true });
        }
      });
    }
    else if(role=="employee"){
      const { Email, Password } = this.empLoginForm.value;
      this.accObj={email:Email,password:Password};

      this.authService.login(this.accObj,'Employee').subscribe({
        next: (res: any) => {
          if(res=="Email Not Valid"){
            this.empLoginForm.get('Email')?.setErrors({ 'invalidEmailLogin': true });
          }
          else if(res=="password Not Valid"){
            this.empLoginForm.get('Password')?.setErrors({ 'invalidPasswordLogin': true });
          }
          else{  //email and password are correct
            const jsonObject = JSON.parse(res);
            localStorage.setItem('token', jsonObject.readLoginDTO.token);
            localStorage.setItem('empid', jsonObject.readLoginDTO.id);
            localStorage.setItem('empName', jsonObject.readLoginDTO.name);
            localStorage.setItem('empRole', jsonObject.readLoginDTO.role);


            this.router.navigate(['/']);
          }
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.empLoginForm.get('Password')?.setErrors({ 'somethingWrong': true });
        }
      });
    }
    else if(role =="merchant"){
      const { Email, Password } = this.merchantLoginForm.value;
      this.accObj={email:Email,password:Password};

      this.authService.login(this.accObj,'Merchant').subscribe({
        next: (res: any) => {
          if(res=="Email Not Valid"){
            this.merchantLoginForm.get('Email')?.setErrors({ 'invalidEmailLogin': true });
          }
          else if(res=="password Not Valid"){
            this.merchantLoginForm.get('Password')?.setErrors({ 'invalidPasswordLogin': true });
          }
          else{  //email and password are correct
            const jsonObject = JSON.parse(res);
            localStorage.setItem('token', jsonObject.readLoginDTO.token);
            localStorage.setItem('merchantid', jsonObject.readLoginDTO.id);
            localStorage.setItem('merchantName', jsonObject.readLoginDTO.name);
            localStorage.setItem('merchantRole', jsonObject.readLoginDTO.role);


            this.router.navigate(['/']);
          }
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.merchantLoginForm.get('Password')?.setErrors({ 'somethingWrong': true });
        }
      });
    }
     
  }
}
