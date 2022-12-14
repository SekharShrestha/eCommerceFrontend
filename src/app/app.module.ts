import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { ComponentComponent } from './component/component.component';
// import { ProductComponent } from './product/product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { HttpClientModule } from '@angular/common/http'
import { ProductService } from './services/product.service';
import { Router, RouterModule, Routes } from '@angular/router';
import { ProductCategoryListComponent } from './components/product-category-list/product-category-list.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import {
  OKTA_CONFIG,
  OktaAuthModule,
  OktaCallbackComponent,
  OktaAuthGuard
} from '@okta/okta-angular';
import appConfig from './config/app-config';
import { OktaAuth } from '@okta/okta-auth-js';
import { LoginStatusComponent } from './components/login-status/login-status.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';
const oktaConfig = Object.assign({
  onAuthRequired: (injector: { get: (arg0: typeof Router) => any; }) => {
    const router = injector.get(Router);
    // Redirect the user to your custom login page
    router.navigate(['/login']);
  }

}, appConfig.oidc);



const oktaAuth = new OktaAuth(oktaConfig);

const routes: Routes =[

  {
    path: 'order-history', 
    component: OrderHistoryComponent,
    canActivate: [OktaAuthGuard]
  },

  {
    path: 'login/callback', 
    component: OktaCallbackComponent
  },
  {
    path: 'login', 
    component: LoginComponent
  },
  {
    path: 'category/:id',
    component: ProductListComponent
  },
  {
    path: 'category',
    component: ProductListComponent
  },
  {
    path: 'products',
    component: ProductListComponent
  },
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },
  {
    path: 'search/:keyword',
    component: ProductListComponent
  },
  {
    path: 'products/:id',
    component: ProductDetailsComponent
  },
  {
    path: 'cart-details',
    component: CartDetailsComponent
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  //CAUTION---
  //The "**" will match on any path that hasn't matched yet. 
  //So this is why it never made it to your "/search" because it appeared after. 
  //You would need to move your "/search" before the "**".
  //The "**" match should always appear last, it is basically a safety net / catchall if nothing else matches.
  {
    path: '**',
    redirectTo: '/products',
    pathMatch: 'full'
  }

]


@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryListComponent,
    SearchComponent,
    ProductDetailsComponent,
    CartStatusComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    LoginStatusComponent,
    OrderHistoryComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    OktaAuthModule
  ],
  providers: [ProductService, { provide: OKTA_CONFIG, useValue: {oktaAuth} }],
  bootstrap: [AppComponent]
})
export class AppModule { }
