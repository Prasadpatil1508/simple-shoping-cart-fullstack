import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// Components
import { AppComponent } from './app.component';
import { ProductGridComponent } from './components/product-grid/product-grid.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { CartModalComponent } from './components/cart-modal/cart-modal.component';

// Services
import { ApiService } from './services/api.service';
import { CartService } from './services/cart.service';

@NgModule({
    declarations: [
        AppComponent,
        ProductGridComponent,
        ProductCardComponent,
        CartModalComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot({
            timeOut: 3000,
            positionClass: 'toast-top-right',
            preventDuplicates: true,
            progressBar: true,
            closeButton: true,
            newestOnTop: true
        })
    ],
    providers: [
        ApiService,
        CartService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
