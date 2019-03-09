import { NgModule } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ProductlistComponent } from './product-list.component';
// import { ProductDetialComponent } from './product-detail.component';
// import { ProductNewComponent } from './product-new.component';
// import { ProductFilterPipe } from './product-filter.pipe';
// import { ProductDetailGuard } from './product-guard.service';
// import { ProductService } from './product.service';
// import { StarComponent } from '../shared/star.component';

import { MaterialModule } from "../material/material.module";
import { SharedModule } from '../shared/shared.module';
import { AdminHomeComponent } from './admin/admin.home.component';
import { OtherHomeComponent } from './other/other.home.component';
import { HomeComponent } from './home.component';
import { CommonModule } from "@angular/common";


@NgModule({
    declarations: [
        HomeComponent,
        AdminHomeComponent,
        OtherHomeComponent
        // ProductlistComponent,
        // ProductNewComponent,
        // ProductDetialComponent,
        // ProductFilterPipe
        // ,
        // StarComponent
    ],
    imports: [
        // FormsModule,
        CommonModule,
        MaterialModule,SharedModule,
        RouterModule.forChild([
            // {path: 'products', component: ProductlistComponent},
            // { path: 'product/:id'
            // , canActivate: [ ProductDetailGuard ]
            // , component: ProductDetialComponent},
            // {path: 'new/product', component: ProductNewComponent}

            {
                path: '', 
                component: HomeComponent
            },
            {
                path: 'admin', 
                component: AdminHomeComponent
            },
            {
                path: 'other', 
                component: OtherHomeComponent
            }
          ])
    ],
    providers: [
        // ProductService,
        // ProductDetailGuard
    ]
})

export class HomeModule {}