import {Component} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ConfirmationService]

})
export class ProductListComponent {
  products: any = [];

  cols!: any[];

  constructor(private productService: ProductService, private messageService : MessageService) {}

  ngOnInit() {
    this.productService.getProducts().subscribe((data : any) => {
      this.products = data;
    });

    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'category', header: 'Category' },
      { field: 'genre', header: 'Quantity' }
    ];
  }

  addProductToCart(product : any){
    let items : any[] = JSON.parse(localStorage.getItem("cart-items") || '[]');
    items.push(product);
    localStorage.setItem("cart-items",JSON.stringify(items));
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Item added to cart successfully!' });
  }


}
