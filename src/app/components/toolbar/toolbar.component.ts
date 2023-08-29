import {Component, OnInit} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {ConfirmationService, ConfirmEventType, MessageService} from "primeng/api";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {filter, map} from "rxjs";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  providers: [ConfirmationService]
})
export class ToolbarComponent implements OnInit {


  headerName: string = "";
  showCart = false;
  sidebarVisible: boolean = false;

  constructor(
    private productService: ProductService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService, private router: Router,
    private titleService: Title) {
  }

  get products() {
    let items: any[] = JSON.parse(localStorage.getItem("cart-items") || '[]');
    return items;
  }

  ngOnInit() {
    this.initializeHeader();
  }

  initializeHeader() {
    this.router.events
      .pipe(
        filter((event: any) => event instanceof NavigationEnd),
        map(() => {
          let route: ActivatedRoute = this.router.routerState.root;
          let routeTitle = '';
          while (route!.firstChild) {
            route = route.firstChild;
          }
          if (route.snapshot.data['title']) {
            routeTitle = route!.snapshot.data['title'];
          }
          if (route.snapshot.data['showCart']) {
            console.log("Bende")
            this.showCart = true
          }
          return routeTitle;
        })
      )
      .subscribe((title: string) => {
        if (title) {
          this.titleService.setTitle(`My App - ${title}`);
          this.headerName = title;
        }
      });
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

    let payload: Record<"items", any[]> = {"items": itemsToPurchase}

    console.log("purcase function requestBody", payload);

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
        this.messageService.add({severity: 'success', summary: 'Success', detail: 'Your order is successfull!'});

      },
      reject: (type: ConfirmEventType) => {
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
