import {Component} from '@angular/core';
import {ProductService} from "../../services/product.service";
import {ConfirmationService, MessageService} from "primeng/api";
import {Product} from "../../core/models/models";

@Component({
  selector: 'app-product-admin',
  templateUrl: './product-admin.component.html',
  styleUrls: ['./product-admin.component.css'],
  providers: [ConfirmationService]
})
export class ProductAdminComponent {
  productDialog: boolean = false;

  products!: Product[];

  product!: Product;

  selectedProducts!: Product[] | null;

  submitted: boolean = false;

  statuses!: any[];

  constructor(private productService: ProductService, private messageService: MessageService, private confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.productService.getProducts().subscribe((data) => (this.products = data));
  }

  addNewAttribute() {
    this.product.attributes?.push({attributeValue: "", attributeName: ""})
    console.log(this.product.attributes)
  }

  openNew() {
    this.product = {attributes: []};
    this.submitted = false;
    this.productDialog = true;
  }


  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        let productId = product.productId;
        if (productId) {
          this.productService.deleteProduct(productId).subscribe(data => {
            this.products = this.products.filter((val) => val.productId !== productId);
            this.product = {attributes: []};
            this.messageService.add({
              severity: 'success',
              summary: 'Successful',
              detail: 'Product Deleted',
              life: 3000
            });
          })
        }
      }
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    console.log(this.product)

    if (this.product.name?.trim()) {

      this.productService.saveProduct(this.product).subscribe((data: any) => {
        this.products.push(data);
        this.messageService.add({severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000});

        this.products = [...this.products];
        this.productDialog = false;
        this.product = {attributes: []};
      })


    }
  }


}
