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
    console.log('ngOnInit');
  }

  refreshProductList(): void {
    this.activatedRoute.data.subscribe(
      (data: {myData: Product[]}) => {
        this.productList = data.myData;
      },
      error => console.log(error)
    );

  }

}
