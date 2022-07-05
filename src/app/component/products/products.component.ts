import { CartService } from './../../service/cart.service';
import { ApiService } from './../../service/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public productList: any;
  searchKey: string = "";
  public filterCategory : any;

  constructor(private apiService: ApiService, private cartService: CartService) { }

  ngOnInit(): void {
    this.apiService.getProduct().subscribe(
      (res) => {
        this.productList = res;
        this.filterCategory = res;

        this.productList.forEach((a: any) => {
          if(a.category === "men's clothing" || a.category === "women's clothing"){
            a.category = 'fashion'
          }
          Object.assign(a, { quantity: 1, total: a.price });
        });
      }
    );

    this.cartService.search.subscribe(
      (value: any) => {       
        this.searchKey = value;
      }
    );
  }

  addToCart(item: any) {
    this.cartService.addToCart(item);
  }

  filter(category:string){
    this.filterCategory = this.productList.filter(
      (a:any)=>{
        if(a.category == category || category == ''){
          return a;
        }
    })
  }

}
