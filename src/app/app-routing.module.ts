import { ProductResolver } from './core/guards/product.resolver';
import { DetailsProductComponent } from './components/products/details-product/details-product.component';
import { RemoveProductComponent } from './components/products/remove-product/remove-product.component';
import { EditProductComponent } from './components/products/edit-product/edit-product.component';
import { AddProductComponent } from './components/products/add-product/add-product.component';
import { ShowProductsComponent } from './components/products/show-products/show-products.component';
import { ProductsComponent } from './components/products/products.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { ProductsResolver } from './core/guards/products.resolver';
import { UserComponent } from './components/user/user.component';
import { UpdateUserComponent } from './components/user/update-user/update-user.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'registration', component: RegistrationComponent},
  {path: 'login', component: LoginComponent},
  {path: 'user', component: UserComponent,
    canActivate: [AuthGuard]},
  {path: 'user/update', component: UpdateUserComponent},
  {path: 'products', component: ProductsComponent,
    canActivate: [AuthGuard],
    data: {pathUrl: 'products'},
    resolve: {myData: ProductsResolver},
    children:[
    {path: '', redirectTo: 'show', pathMatch: 'full'},
    {path: 'show', component: ShowProductsComponent},
    {path: 'add', component: AddProductComponent},
    {path: 'details/:id', component: DetailsProductComponent,
      resolve: {items: ProductResolver},
    },
    {path: 'edit/:id', component: EditProductComponent},
    {path: 'remove/:id', component: RemoveProductComponent}
  ]},
  {path: '**', component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
