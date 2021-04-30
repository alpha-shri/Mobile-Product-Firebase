import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { Product } from '../models/Product';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FireBaseService {

  constructor(private fireStore: AngularFirestore) { }

  addNewProductService(item: Product) {

    const addedItem = this.fireStore.collection('product').add(item);
    console.table(addedItem);

    return addedItem;

  }
  getAllProductsService(){
      return this.fireStore.collection('product')
                           .valueChanges() as Observable<Product[]>;
    
  }
}
