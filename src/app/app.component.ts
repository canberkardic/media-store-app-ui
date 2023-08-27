import {Component} from '@angular/core';
import {ProductService} from "./services/product.service";
import {ConfirmationService, ConfirmEventType, MessageService} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ProductManagementUI';

  sidebarVisible: boolean = false;

  constructor(private productService: ProductService, private confirmationService: ConfirmationService, private messageService: MessageService) {
  }

  get products() {
    let items: any[] = JSON.parse(localStorage.getItem("cart-items") || '[]');
    return items;
  }


  purchaseItems() {
    let itemsToPurchase: any[] = [];
    for (let p of this.products) {

      let count = this.products.filter(product => product.productId == p.productId).length;
      let item = {
        productId: p.productId,
        count: count
      }
      if (!(itemsToPurchase.find(item => item.productId == p.productId))) {
        itemsToPurchase.push(item);
      }
    }


    const payload = {
      "items": itemsToPurchase
    }

    console.log(itemsToPurchase, payload)

    this.productService.purchaseAllProducts(payload).subscribe((response: any) => {
      let total = response.total;
      this.confirmPurchase(total);
    })

  }

  confirmPurchase(totalPrice: number) {
    this.confirmationService.confirm({
      message: 'Total Price is ' + totalPrice + ' are you sure that you want to proceed?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        localStorage.removeItem("cart-items");
        this.sidebarVisible = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Your order is successfull!' });

      },
      reject: (type:ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            localStorage.removeItem("cart-items");
            this.sidebarVisible = false;
            break;
          case ConfirmEventType.CANCEL:
            break;
        }
      }
    });


  }
}
