import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule} from "@angular/common";
import {ButtonModule} from 'primeng/button';
import {RouterModule, Routes} from "@angular/router";
import {ProductListComponent} from './pages/product-list/product-list.component';
import {HttpClientModule} from "@angular/common/http";
import {DataViewModule} from "primeng/dataview";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {SidebarModule} from "primeng/sidebar";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {ProductAdminComponent} from "./pages/product-admin/product-admin.component";
import {ToolbarModule} from "primeng/toolbar";
import {FileUploadModule} from "primeng/fileupload";
import {TableModule} from "primeng/table";
import {InputTextModule} from "primeng/inputtext";
import {DialogModule} from "primeng/dialog";
import {FormsModule} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {ToolbarComponent} from './components/toolbar/toolbar.component';


const routes: Routes = [
  {path: '', component: ProductListComponent, data: {title: "Product List", showCart: true}},
  {path: 'admin', component: ProductAdminComponent, data: {title: "Admin", showCart: false}},
]

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductAdminComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    HttpClientModule,
    DataViewModule,
    ButtonModule,
    ToastModule,
    SidebarModule,
    ConfirmDialogModule,
    ToolbarModule,
    FileUploadModule,
    TableModule,
    InputTextModule,
    DialogModule,
    FormsModule,
    InputNumberModule,
    ToolbarModule,
    RouterModule.forRoot(routes)
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
