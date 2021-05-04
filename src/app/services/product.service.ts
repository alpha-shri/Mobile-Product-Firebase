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

  addNewProductService(item: Product, file:File): Observable<Product[]> {

    // Create form data
    const formData = new FormData(); 
        
    // Store form name as "file" with file data
    formData.append("file", file, file.name);
    

    this.inventory.push(item);

    return of<Product[]>(this.inventory);
  }

  getAllProductsService(): Observable<Product[]>{
    return of(this.inventory);   
}
}
