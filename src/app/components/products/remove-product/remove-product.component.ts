import { Product } from './../../../core/models/product';
import { Component, OnInit } from '@angular/core';
import { AccessAPIService } from 'src/app/access-api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-remove-product',
  templateUrl: './remove-product.component.html',
  styleUrls: ['./remove-product.component.css']
})
export class RemoveProductComponent implements OnInit {

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
    )
  }

  removeProduct(id: number): void {
    this.accessAPIService.delete(this.urlSection, id).subscribe(
      data => console.log(data),
      error => console.log(error)
    )

    this.router.navigate(['products', 'show']);
  }

}
