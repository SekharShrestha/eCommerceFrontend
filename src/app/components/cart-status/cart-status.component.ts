import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  totalPrice: number = 0.00;
  totalQuantity: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.updateCartStatus();
  }


  updateCartStatus() {
    //subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(
      (data : any) => {
        this.totalPrice = data;
        console.log(data);
      },
      (error : any) => {
        console.log(error);
      }
    )

    this.cartService.totalQuantity.subscribe(
      (data : any) => {
        this.totalQuantity = data;
        console.log(data);
      },
      (error : any) => {
        console.log(error);
      }
    )



    //subscribe to the cart totalQuantity
  }

}
