import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/Product';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private inventory: Product[] = [];

  constructor(private http: HttpClient, private fireStore: AngularFirestore) {}

  addNewProductService(item: Product): Observable<Product[]> {

    this.inventory.push(item);
    const addedItem = this.fireStore.collection('product').add(item);
    console.table(addedItem);

    return of<Product[]>(this.inventory);
  }
}
