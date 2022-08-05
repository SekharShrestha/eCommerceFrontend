import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Product } from '../common/product';
import { ProductCategory } from '../common/product-category';
import { SearchComponent } from '../components/search/search.component';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
   

  private baseProductUrl = 'http://localhost:8080/api/products';
  private baseCategoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private http: HttpClient) { }

  getProductList(_categoryId: number): Observable<Product[]>{
    const searchUrl = `${this.baseProductUrl}/search/findByCategoryId?id=${_categoryId}`;
    return this.http.get<GetResponseProduct>(searchUrl).pipe(map(response => response._embedded.products));
  }

  getProductListPage(_page: number, _size: number, _categoryId: number): Observable<GetResponseProduct>{
    const searchUrl = `${this.baseProductUrl}/search/findByCategoryId?id=${_categoryId}&page=${_page}&size=${_size}`;
    return this.http.get<GetResponseProduct>(searchUrl);
  }

  getProductCategories(): Observable<ProductCategory[]> {
    const searchUrl = `${this.baseCategoryUrl}`;
    return this.http.get<GetResponseProductCategory>(searchUrl).pipe(map(response => response._embedded.productCategory));
  }

  searchProducts(_keyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseProductUrl}/search/findByNameContaining?name=${_keyword}`;
    return this.http.get<GetResponseProduct>(searchUrl).pipe(map(response => response._embedded.products));
  }

  getProduct(productId: number): Observable<Product> {
    const searchUrl = `${this.baseProductUrl}/${productId}`;
    return this.http.get<Product>(searchUrl);

  } 

  searchProductListPage(_page: number, _size: number, _keyword: string): Observable<GetResponseProduct>{
    const searchUrl = `${this.baseProductUrl}/search/findByNameContaining?name=${_keyword}&page=${_page}&size=${_size}`;
    return this.http.get<GetResponseProduct>(searchUrl);
  }
}

interface GetResponseProduct{
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
    }
}

interface GetResponseProductCategory{
  _embedded: {
    productCategory: ProductCategory[];
  }
}

