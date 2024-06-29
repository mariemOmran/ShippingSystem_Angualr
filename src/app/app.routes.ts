import { Routes } from '@angular/router';
import { LayoutComponent } from '../Components/layout/layout.component';
import { MainDashboardComponent } from '../Components/main-dashboard/main-dashboard.component';
import { OrderFormComponent } from '../Components/Order/order-form/order-form.component';

export const routes: Routes = [
    {path:'',component:LayoutComponent,children:[
        {path:'',component:OrderFormComponent}
    ]}
];
