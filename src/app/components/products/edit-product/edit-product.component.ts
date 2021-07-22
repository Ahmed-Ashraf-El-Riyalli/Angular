import { ActivatedRoute, Router } from '@angular/router';
import { AccessAPIService } from './../../../access-api.service';
import { Product } from './../../../core/models/product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  readonly urlSection: string = 'Product';
  product: Product;

  constructor(private accessAPIService: AccessAPIService,
              private activatedRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.params.id;

    this.accessAPIService.getOne(this.urlSection, id).subscribe(
      data => this.product = data,
      error => console.log(error)
    );
  }

  updateProduct(name: string, price: number, quantity: number): void {
    const id = this.activatedRoute.snapshot.params.id;
    const product: Product = {
      ID: this.product.ID,
      Name: name,
      Price: price,
      Quantity: quantity,
      ImageName: null
    };

    this.accessAPIService.update(this.urlSection, id, product).subscribe(
      data => {
        this.product = data;
        this.router.navigate(['products', 'show']);
      },
      error => console.log(error)
    );
  }

}
