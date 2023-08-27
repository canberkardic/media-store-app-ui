import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http : HttpClient) { }

  baseUrl = "http://localhost:7080/products"

  getProducts(): Observable<any>{
    return this.http.get(this.baseUrl+"/list-products");
  }

  purchaseAllProducts(products : any): Observable<any>{
    return this.http.post(this.baseUrl + "/purchase",products);
  }

  saveProduct(product : any){
    return this.http.post(this.baseUrl+"/save",product);
  }

  deleteProduct(product : any){
    return this.http.delete(this.baseUrl+"/delete",product);
  }

}
