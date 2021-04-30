import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { FireBaseService } from 'src/app/services/fire-base.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  constructor(private _firebaseService: FireBaseService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  productList: Product[] = [];

  getAllProducts() {
    this._firebaseService.getAllProductsService()
        .subscribe((data) => {
            this.productList = data;

        });
  }
}
