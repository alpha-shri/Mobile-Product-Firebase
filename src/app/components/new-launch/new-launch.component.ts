import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/Product';
import { FireBaseService } from 'src/app/services/fire-base.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-new-launch',
  templateUrl: './new-launch.component.html',
  styleUrls: ['./new-launch.component.scss'],
})
export class NewLaunchComponent implements OnInit {
  rams: Array<number> = [4, 6, 8, 12];
  success: boolean = false;
  loading: boolean = false; // Flag variable
  file: File = null; // Variable to store file

  productinfo: Product;

  productForm: FormGroup;

  constructor(
    private _service: ProductService,
    private _firebaseService: FireBaseService,
    private fb: FormBuilder,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      price: ['', [Validators.required]],
      dealer: ['', [Validators.required]],
      ramTypes: ['', [Validators.required]],
      processor: ['', [Validators.required]],
    });

    this._service
      .getAllProductsService()
      .subscribe((data) => (this.productList = data));
  }

  productList: Product[] = [];
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

  //! Without using Firestore-DB
  addProductFireBase() {
    this.loading = true;
    const formValue: Product = this.productForm.value;
    console.log('Form Details: ', formValue);

    try {
      this._firebaseService
        .addNewProductService(formValue)
        .then((data) => {
          this._snackbar.open('New mobile added successfully', 'Close');
          console.log('Completed successfully ...');
          this.productForm.reset();
        })
        .catch((err) => console.warn(`Error ${err}`));
    } catch (error) {
      console.error(error);
    }
  }
}
