import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Product } from 'src/app/models/Product';
import { FireBaseService } from 'src/app/services/fire-base.service';
import { EditItemComponent } from '../edit-item/edit-item.component';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent implements OnInit {
  constructor(
    private _firebaseService: FireBaseService,
    public dialog: MatDialog,
    public _snackbar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  productList: Product[] = [];

  getAllProducts() {
    this._firebaseService.getAllProductsService().subscribe((data) => {
      this.productList = data;

      console.table(this.productList);
    });
  }

  editDialog(item: Product) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.data = item;
    dialogConfig.width = '40%';
    dialogConfig.height = '70%';

    const dialogRef = this.dialog.open(EditItemComponent, dialogConfig);
  }

  deleteItem(itemId: string) {
    console.log('Inside deleteItem: ' + itemId);

    this._firebaseService
        .deleteProductService(itemId)
        .then( response => {
              this._snackbar.open('Deleted successfully', 'Close');
        });
  }
}
