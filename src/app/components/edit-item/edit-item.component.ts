import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/Product';
import { FireBaseService } from 'src/app/services/fire-base.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styles: [],
})
export class EditItemComponent implements OnInit {
  rams: Array<number> = [4, 6, 8, 12];
  productForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Product,
    private _service: ProductService,
    private _firebaseService: FireBaseService,
    private fb: FormBuilder,
    private _snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<EditItemComponent>
  ) {}

  ngOnInit(): void {
    this.productForm = this.fb.group({
      id: [this.data.id],
      name: [this.data.name, [Validators.required, Validators.minLength(2)]],
      price: [this.data.price, [Validators.required]],
      dealer: [this.data.dealer, [Validators.required]],
      ramTypes: [this.data.ramTypes, [Validators.required]],
      processor: [this.data.processor, [Validators.required]],
    });
  }

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

  closeButton() {
    this.dialogRef.close();
  }

  updateProduct(){
    console.table(this.productForm.value);
    let product: Product = this.productForm.value;
    this._firebaseService
        .updateProductService(product)
        .then( data => {
          this._snackbar.open('Mobile details updated successfully', 'Close');
          this.dialogRef.close();
        });
        
     

  }
}
