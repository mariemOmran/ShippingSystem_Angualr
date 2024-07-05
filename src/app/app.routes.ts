import { EmployeesComponent } from './../Components/employees/employees.component';
import { Routes } from '@angular/router';
import { LayoutComponent } from '../Components/layout/layout.component';
import { MainDashboardComponent } from '../Components/main-dashboard/main-dashboard.component';
import { OrderFormComponent } from '../Components/Order/order-form/order-form.component';
import { DeliveryAccountsComponent } from '../Components/DeliveryAccounts/delivery-accounts/delivery-accounts.component';
import { MerchantAccountsComponent } from '../Components/MercgentAccount/merchant-accounts/merchant-accounts.component';
import { AddDeliveryAcountComponent } from '../Components/DeliveryAccounts/add-delivery-acount/add-delivery-acount.component';

import { RolesComponent } from '../Components/roles/roles.component';
import { PermissionsComponent } from '../Components/roles/permissions/permissions.component';

import { AddMerchantAccountComponent } from '../Components/MercgentAccount/add-merchant-account/add-merchant-account.component';
import { UpdateDeliveryAccountComponent } from '../Components/DeliveryAccounts/updatedeliveryaccount/updatedeliveryaccount.component';

import { BranchesComponent } from '../Components/branches/branches.component';
import { GovernmentsComponent } from '../Components/governments/governments.component';
import { EmployeeFormComponent } from '../Components/employees/employee-form/employee-form.component';
import { CitiesComponent } from '../Components/cities/cities.component';
import { OrdersComponent } from '../Components/Order/orders.component';
import { ReportsComponent } from '../Components/reports/reports.component';

import { UpdateMerchantAccountComponent } from '../Components/MercgentAccount/update-merchant-account/update-merchant-account.component';
import { LoginComponent } from '../Components/login/login.component';
import { NotFoundComponent } from '../Components/not-found/not-found.component';
import { isLoginGuard } from '../Guards/is-login.guard';
import { employeeGuard } from '../Guards/employee.guard';
import { adminGuard } from '../Guards/admin.guard';
import { merchantGuard } from '../Guards/merchant.guard';
import { deliveryGuard } from '../Guards/delivery.guard';

export const routes: Routes = [
    
    {path:'login',component:LoginComponent,pathMatch:'full'},
    {path:'',component:LayoutComponent,  canActivate: [isLoginGuard],children:[
        {path:'',component:MainDashboardComponent}, //,canActivate:[employeeGuard,adminGuard,merchantGuard,deliveryGuard]
        
        {path:'orders',component:OrdersComponent},  //,canActivate:[adminGuard,deliveryGuard]
        {path:'orders/addorder',component:OrderFormComponent},  //,canActivate:[merchantGuard]
        {path:'report',component:ReportsComponent},
        
        {path:'role',component:RolesComponent},
        {path:'role/permissions/:id',component:PermissionsComponent},

        {path:'employee',component:EmployeesComponent , canActivate: [adminGuard]},
        {path:'MerchantAccounts',component:MerchantAccountsComponent, canActivate: [adminGuard]},
        {path:'DeliveryAccounts',component:DeliveryAccountsComponent , canActivate: [adminGuard]},
        {path:'employee/:id',component:EmployeeFormComponent},

        {path:'DeliveryAccounts/UpdateDeliveryAccount/:id', component:UpdateDeliveryAccountComponent },
        {path:'DeliveryAccounts/AddDeliveryAccount' ,component:AddDeliveryAcountComponent},

        {path:'MerchantAccounts/AddMerchantAccount' ,component:AddMerchantAccountComponent},
        {path:'MerchantAccounts/UpdateMerchantAccount/:id', component:UpdateMerchantAccountComponent },
        
        {path:'Branches' ,component:BranchesComponent},
        {path:'Governments' ,component:GovernmentsComponent},
        // {path:'Governments' ,component:GovernmentsComponent,canActivate:[adminGuard]},
        // {path:'Cities' ,component:CitiesComponent,canActivate:[adminGuard]},
        {path:'Cities' ,component:CitiesComponent},
    ]},
    {path:'**',component:NotFoundComponent}
       

];
