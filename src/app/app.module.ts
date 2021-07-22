import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { ProductsComponent } from './components/products/products.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { EditProductComponent } from './components/products/edit-product/edit-product.component';
import { RemoveProductComponent } from './components/products/remove-product/remove-product.component';
import { ShowProductsComponent } from './components/products/show-products/show-products.component';
import { DetailsProductComponent } from './components/products/details-product/details-product.component';
import { HTTP_INTERCEPTOR_PROVIDERS } from './core/interceptors';
import { UserComponent } from './components/user/user.component';
import { UpdateUserComponent } from './components/user/update-user/update-user.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    ErrorComponent,
    ProductsComponent,
    AddProductComponent,
    EditProductComponent,
    RemoveProductComponent,
    ShowProductsComponent,
    DetailsProductComponent,
    UserComponent,
    UpdateUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    HTTP_INTERCEPTOR_PROVIDERS
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
