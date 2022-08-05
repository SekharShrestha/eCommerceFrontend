import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


  products: Product[];
  previousCategoryId: number;
  currentCategoryId: number;
  searchMode: boolean

  pageNumber: number = 1;
  pageSize: number = 8;
  totalElements: number = 0;
  
  previousKeyword: string = null;

  constructor(private productService: ProductService, private cartService: CartService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {this.listProducts();})
  }


  listProducts(){
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if(this.searchMode){
      this.handleSearchProducts();
      console.log(this.searchMode)
    }
    else{
      this.handleListProducts();
    }
  }


  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');

    if(this.previousKeyword != theKeyword){
      this.pageNumber = 1;
    }

    this.previousKeyword = theKeyword;

    this.productService.searchProductListPage(this.pageNumber-1, this.pageSize, theKeyword).subscribe(this.processResult()); 
      
  }


  handleListProducts(){
    console.log(this.searchMode)

    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
      //+ converts id param that's in string, to a number
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    }
    else{
      this.currentCategoryId = 1;
    }


    if(this.previousCategoryId != this.currentCategoryId){
      this.pageNumber = 1;
    }

    this.previousCategoryId = this.currentCategoryId;
    console.log(`currentCategoryId= ${this.currentCategoryId}`, `pageNo= ${this.pageNumber}`);

    this.productService.getProductListPage(this.pageNumber-1, this.pageSize, this.currentCategoryId).subscribe(
      this.processResult()
    );
  }

  processResult(){
    return data => {
      this.products = data._embedded.products;
      this.pageNumber = data.page.number+1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    }
  }

  updatePageSize(pageSize: number){
    this.pageSize = pageSize;
    this.pageNumber = 1;
    this.listProducts();
  }


  addToCart(product: Product){
    console.log(`${product.name}`);
    
    const cartItem = new CartItem(product);
    this.cartService.addToCart(cartItem);
  }

}
