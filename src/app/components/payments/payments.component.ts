import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/Product';
import { FireBaseService } from 'src/app/services/fire-base.service';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styles: [
    
  ]
})
export class PaymentsComponent implements OnInit {

  ONE = 1;
  addItemList: Product[] = [];
  qty:Array<number> = [1,2,3,4,5];
  mobileNames: Array<string>;

  amount: number = 0;

  amountOfItems: Array<Number>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Product[],
    private _firebaseService: FireBaseService,
    private _snackbar: MatSnackBar,
    public dialogRef: MatDialogRef<PaymentsComponent>
  ) { }

  ngOnInit(): void {
      this.addItemList = this.data;
      this.mobileNames = this.addItemList
                             .map( item => item.name);

      
  }

  calcPrice(value, pricing: Product){

    let x: Temp = {
      id: pricing.id,
      price: pricing.price,
      net: pricing.price * value
    }
    

  }
  fetchBillFlag = false;
  
  fetchBill(){
    this.fetchBillFlag = true;

  }


  calcTotalPrice(){
    console.log("Total Amount = ", this.amount);
    

  }


}

export interface Temp{
  id: string,
  price: number,
  net: number
}
