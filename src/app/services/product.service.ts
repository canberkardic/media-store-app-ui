import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Product} from "../core/models/models";

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:7080/products"

  constructor(private http: HttpClient) {
  }

  getProducts(): Observable<any> {
    return this.http.get(this.baseUrl + "/list-products");
  }

  purchaseAllProducts(products: any): Observable<any> {
    return this.http.post(this.baseUrl + "/purchase", products);
  }

  saveProduct(productToSave: Product) {

    const payload: any = {
      product: {
        ...productToSave
      },
      attributes: {}
    };

    productToSave.attributes.forEach(item => {
      payload.attributes[item.attributeName] = item.attributeValue;
    });

    console.log(payload)

    return this.http.post(this.baseUrl + "/save", payload);
  }

  deleteProduct(productId: number) {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        productId: productId
      },
    };

    return this.http.delete(this.baseUrl + "/delete", options);
  }

}
