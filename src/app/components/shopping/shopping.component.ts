import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Basket } from 'src/app/models/Basket';
import { Product } from 'src/app/models/Product';
import { FireBaseService } from 'src/app/services/fire-base.service';
import { PaymentsComponent } from '../payments/payments.component';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.scss']
})
export class ShoppingComponent implements OnInit {

  availableMobiles: Product[] = [];
  mobileDetails: Product;

  mobileId: string;
  changed = false;

  cartItems: Product[] = [];

  basket: Basket;


  shopForm: FormGroup;

  constructor(private _firebaseService: FireBaseService,
    public _snackbar: MatSnackBar,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this._firebaseService.getAllProductsService()
        .subscribe( data => this.availableMobiles = data);
  }

  getMobileDetails(event){
    
    this.mobileId = event.value;
    console.log("Changed", event.value);
    

    this.mobileDetails = this.availableMobiles
                .find( item => item.id === this.mobileId);
    this.changed = true;

  }

  goToCart(mobile: Product){
    console.log(mobile);

    if(this.cartItems.find( x => x.id === mobile.id )){
        this._snackbar.open('Item already present in the cart', 'Close');
      }else{
        this.cartItems.push(mobile);
        console.table(this.cartItems);
        this._snackbar.open(`${mobile.name} added to cart`, 'Close');

    }
    
  }

  clearCart(){
    this.cartItems.length = 0;
  }

  checkOutBasket(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = this.cartItems;
    dialogConfig.width = '60%';
    dialogConfig.height = '70%';
    this.dialog.open(PaymentsComponent, dialogConfig);
    

  }

}
