import { AccessAPIService } from './../../../access-api.service';
import { Product } from './../../../core/models/product';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  constructor(private accessAPIService: AccessAPIService, private router: Router) { }

  ngOnInit(): void {
  }

  addNewProduct(name: string, price: number, quantity: number): void {
    const product: Product = {
      ID: 0,
      Name: name,
      Price: price,
      Quantity: quantity,
      ImageName: null
    }

    const urlSection = 'Product';

    this.accessAPIService.add(urlSection, product).subscribe(
      data => {
        this.router.navigate(['products', 'show']);
      },
      error => console.log(error)
    );
  }
}
