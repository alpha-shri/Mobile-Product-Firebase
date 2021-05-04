import { Injectable } from '@angular/core';

import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/Product';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';

import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class FireBaseService {

  products: Observable<Product[]>;
  productDoc: AngularFirestoreDocument<Product>;

  isLoggedIn: boolean = false;



  constructor(private fireStore: AngularFirestore,
              private fireBaseAuth: AngularFireAuth) {
    // this.products = this.fireStore
    //   .collection(product)
    //   .valueChanges() as Observable<Product[]>;

    //! Fetching the Document ID from Firestore
    // todo : Little bit complicated process
    this.products = this.fireStore
      .collection('product')
      .snapshotChanges()
      .pipe(
        map((changes) => {
          return changes.map((a) => {
            const data = a.payload.doc.data() as Product;
            data.id = a.payload.doc.id;
            return data;
          });
        })
      );
  }


  async signInService(email:string, password: string){
    await this.fireBaseAuth.signInWithEmailAndPassword(email, password)
              .then( response => {
                this.isLoggedIn = true;
                localStorage.setItem('user', JSON.stringify(response.user))
              })
              .catch( error => console.error(`Error inside signInService: ${error}`))
  }

  async signUpService(email:string, password: string){
    await this.fireBaseAuth.createUserWithEmailAndPassword(email, password)
              .then( response => {
                this.isLoggedIn = true;
                localStorage.setItem('user', JSON.stringify(response.user))
              })
              .catch( error => console.error(`Error inside signUpService: ${error}`))
  }

  logOutService(){
    this.fireBaseAuth.signOut();
    localStorage.removeItem('user');
  }

  addNewProductService(item: Product): Promise<any> {
    return this.fireStore.collection('product').add(item);
  }

  getAllProductsService() {
    this.fireStore.collection('product').snapshotChanges();

    return this.products;
  }

  updateProductService(item: Product) {
    
    this.productDoc  = this.fireStore.doc(`product/${item.id}`);

    return this.productDoc.update(item);
                        
  }

  deleteProductService(itemId: string) {
    this.productDoc  = this.fireStore.doc(`product/${itemId}`);

    return this.productDoc.delete();
  }


}
