import { ActivatedRoute } from '@angular/router';
import { Product } from './../../../core/models/product';
import { Component, OnInit } from '@angular/core';
import { AccessAPIService } from 'src/app/access-api.service';

@Component({
  selector: 'app-show-products',
  templateUrl: './show-products.component.html',
  styleUrls: ['./show-products.component.css']
})
export class ShowProductsComponent implements OnInit {

  productList: Product[];

  constructor(private accessAPIService: AccessAPIService, private activatedRoute: ActivatedRoute) {
    this.productList = [];
  }

  ngOnInit(): void {
    this.refreshProductList();
  }

  refreshProductList(): void {
    this.accessAPIService.getAll(this.accessAPIService.productUrl).subscribe(
      data => this.productList  = data,
      error => console.log(error)
    )

    // this.activatedRoute.data.subscribe(
    //   data => console.log(data),
    //   error => console.log(error)
    // )
  }

}
