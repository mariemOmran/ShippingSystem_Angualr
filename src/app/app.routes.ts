import { EmployeesComponent } from './../Components/employees/employees.component';
import { Routes } from '@angular/router';
import { LayoutComponent } from '../Components/layout/layout.component';
import { MainDashboardComponent } from '../Components/main-dashboard/main-dashboard.component';
import { OrderFormComponent } from '../Components/Order/order-form/order-form.component';
import { DeliveryAccountsComponent } from '../Components/DeliveryAccounts/delivery-accounts/delivery-accounts.component';
import { MerchantAccountsComponent } from '../Components/MercgentAccount/merchant-accounts/merchant-accounts.component';
import { AddDeliveryAcountComponent } from '../Components/DeliveryAccounts/add-delivery-acount/add-delivery-acount.component';
import { AddMerchantAccountComponent } from '../Components/MercgentAccount/add-merchant-account/add-merchant-account.component';

export const routes: Routes = [

    {path:'',component:LayoutComponent,children:[
        {path:'',component:MainDashboardComponent},
        {path:'addorder',component:OrderFormComponent},

        {path:'employee',component:EmployeesComponent},

        {path:'DeliveryAccounts',component:DeliveryAccountsComponent },
        {path:'MerchantAccounts',component:MerchantAccountsComponent},
        {path:'AddDeliveryAccount' ,component:AddDeliveryAcountComponent},
        {path:'AddMerchantAccount' ,component:AddMerchantAccountComponent}

    ]}
];
