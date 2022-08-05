import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totalPrice: number;
  totalQuantity: number;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }


  listCartDetails() {


    this.cartItems = this.cartService.cartItems;

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

    //compute cart total price and qty
    this.cartService.computeCartTotal();
  }

  incrementQty(cartItem: CartItem){
    this.cartService.addToCart(cartItem);
  }

  decrementQty(cartItem: CartItem){
    this.cartService.decrementQty(cartItem);
  }

  remove(cartItem: CartItem){
    this.cartService.remove(cartItem);
  }
}
