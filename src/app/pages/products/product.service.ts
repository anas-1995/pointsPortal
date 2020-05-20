// import { Center } from './../../models/center.model';
import { MainService } from '../../service/main.service';
import { Injectable } from '@angular/core';
import { Product } from '../../models/product.model';

@Injectable()
export class ProductService {

  constructor(private mainSer: MainService) { }


  getOneObject(id, callback) {
    this.mainSer.APIServ.get("products/" + id)
      .subscribe((data: any) => {
        callback(null, new Product(data))
      }, error => {
        callback(error, null)
      })
  }


  createItem(data, callback) {
    this.mainSer.APIServ.post("products/addProduct", data)
      .subscribe((data: any) => {
        callback(null, data)
      }, error => {
        callback(error, null)
      })
  }

  updateItem(data, id, callback) {
    delete data.id
    this.mainSer.APIServ.put("products/" + id+"/updateProduct", data)
      .subscribe((data: any) => {
        callback(null, data)
      }, error => {
        callback(error, null)
      })
  }


  getPaginationObject(whereObject, limit, offset, callback) {
    let self = this
    var filter = { "limit": limit, "offset": offset, "where": whereObject }
    if (offset != 0) {

      self.mainSer.APIServ.get("products?filter=" + JSON.stringify(filter))
        .subscribe((data: any) => {
          callback(null, Product.arrayConstructor(data))
        }, error => {
          callback(error, null)
        })
    }
    else {
      self.getCount(whereObject, function (error, count) {
        if (error)
          callback(error, null)
        else {
          self.mainSer.APIServ.get("products?filter=" + JSON.stringify(filter))
            .subscribe((data: any) => {
              callback(null, Product.arrayConstructor(data), count)
            }, error => {
              callback(error, null)
            })
        }
      })
    }
  }


  getCount(whereObject, callback) {
    this.mainSer.APIServ.get("products/count?where=" + JSON.stringify(whereObject))
      .subscribe((data: any) => {
        callback(null, data.count)
      }, error => {
        callback(error, null)
      })
  }

  getAllObject(callback) {
    this.mainSer.APIServ.get("products")
      .subscribe((data: any) => {
        callback(null, Product.arrayConstructor(data))
      }, error => {
        callback(error, null)
      })
  }


}
