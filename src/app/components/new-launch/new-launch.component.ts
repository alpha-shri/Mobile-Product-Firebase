import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/models/Product';
import { FireBaseService } from 'src/app/services/fire-base.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-new-launch',
  templateUrl: './new-launch.component.html',
  styleUrls: ['./new-launch.component.scss'],
})
export class NewLaunchComponent implements OnInit {
  productinfo: Product;

  rams: Array<number> = [4, 6, 8, 12];
  loading: boolean = false;
  success: boolean = false;

  productForm: FormGroup;

  constructor(private _service: ProductService,
              private _firebaseService: FireBaseService,
              private fb: FormBuilder) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      price: ['', [Validators.required]],
      dealer: ['', [Validators.required]],
      ramTypes: ['', [Validators.required]],
      processor: ['', [Validators.required]],
    });
  }
  // Getters for form-field

  get name() {
    return this.productForm.get('name');
  }
  get price() {
    return this.productForm.get('price');
  }
  get dealer() {
    return this.productForm.get('dealer');
  }
  get ramTypes() {
    return this.productForm.get('ramTypes');
  }
  get processor() {
    return this.productForm.get('processor');
  }

  // addNewProduct() {
  //   this.loading = true;
  //   const formValue: Product = this.productForm.value;
  //   // console.log("Form Details: ", formValue);

  //   try {
  //     this._service
  //       .addNewProductService(formValue)
  //       .subscribe((response) => console.table(response));
  //   } catch (error) {}
  // }

  addProductFireBase(){
    const formValue: Product = this.productForm.value;

    this._firebaseService.addNewProductService(formValue)
        .then( response => {

        });

  }

  getAllProducts(){
      this._firebaseService.getAllProductsService()
  }



}
