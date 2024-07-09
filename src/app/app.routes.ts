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
import { EmployeeFormComponent } from '../Components/employees/employee-form/employee-form.component';
import { OrdersComponent } from '../Components/Order/orders.component';
import { ReportsComponent } from '../Components/reports/reports.component';
import { UpdateMerchantAccountComponent } from '../Components/MercgentAccount/update-merchant-account/update-merchant-account.component';

export const routes: Routes = [

    {path:'',component:LayoutComponent,children:[
        {path:'',component:MainDashboardComponent},
        {path:'orders',component:OrdersComponent},
        {path:'report',component:ReportsComponent},
        {path:'orders/addorder',component:OrderFormComponent},
        {path:'role',component:RolesComponent},
        {path:'role/permissions/:id',component:PermissionsComponent},

        {path:'employee',component:EmployeesComponent},
        {path:'employee/:id',component:EmployeeFormComponent},

        {path:'DeliveryAccounts',component:DeliveryAccountsComponent },
        {path:'MerchantAccounts',component:MerchantAccountsComponent},
        {path:'AddDeliveryAccount' ,component:AddDeliveryAcountComponent},
        {path:'Branches' ,component:BranchesComponent},
        {path:'AddMerchantAccount' ,component:AddMerchantAccountComponent},
        { path: 'UpdateDeliveryAccount/:id', component:UpdateDeliveryAccountComponent },
  
        { path: 'UpdateMerchantAccount/:id', component:UpdateMerchantAccountComponent }

    ]}
];
