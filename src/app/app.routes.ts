import { Routes } from '@angular/router';
import { LayoutComponent } from '../Components/layout/layout.component';
import { MainDashboardComponent } from '../Components/main-dashboard/main-dashboard.component';

export const routes: Routes = [
    {path:'',component:LayoutComponent,children:[
        {path:'',component:MainDashboardComponent}
    ]}
];
