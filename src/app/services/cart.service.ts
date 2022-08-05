import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems: CartItem[] = [];
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);
  storage: Storage = sessionStorage;

  constructor() {
    //reading data from storage
    let data = JSON.parse(this.storage.getItem('cartItems'));
    if(data != null){
      this.cartItems = data;
      //compute totals based on data that is read from storage
      this.computeCartTotal();
    }
   }


  addToCart(cartItem: CartItem){
    //check if we already have item in cart
    let alreadyExists: boolean = false;
    let existingCartItem: CartItem = undefined;

    if(this.cartItems.length > 0){
      //find the item in cart based on item id
      for(let c of this.cartItems){
        if(c.id === cartItem.id){
          existingCartItem = c;
          break;
        }
      }

      //check if we found the item in cart
      alreadyExists = (existingCartItem != undefined);
    }

    if(alreadyExists){
      //increment the quantity
      existingCartItem.quantity++;
    }
    else{
      //add the item to the arr
      this.cartItems.push(cartItem);
    }
    //compute cart total price and quantity
    this.computeCartTotal();
  }


  computeCartTotal() {
    let totalPrice: number = 0;
    let totalQuantity: number = 0;

    for(let c of this.cartItems){
      totalPrice += c.quantity * c.unitPrice;
      totalQuantity += c.quantity;
    }

    //publish new values
    this.totalPrice.next(totalPrice);
    this.totalQuantity.next(totalQuantity);

    //persist cart data
    this.persistCartItems();
    
  }

  persistCartItems(){
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }


  decrementQty(cartItem: CartItem) {
    cartItem.quantity--;

    if(cartItem.quantity === 0){
      this.remove(cartItem);
    }
    else{
      this.computeCartTotal();
    }
  }

  remove(cartItem: CartItem) {
    const index = this.cartItems.findIndex(c => c.id === cartItem.id);

    if(index > -1){
      this.cartItems.splice(index,1);
      this.computeCartTotal();
    }
  }
}
