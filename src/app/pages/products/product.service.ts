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
    this.mainSer.APIServ.put("products/" + id, data)
      .subscribe((data: any) => {
        callback(null, data)
      }, error => {
        callback(error, null)
      })
  }


  getPaginationObject(limit, offset, callback) {
    let self = this
    var filter = { "limit": limit, "offset": offset }
    if (offset != 0) {

      self.mainSer.APIServ.get("products?filter=" + JSON.stringify(filter))
        .subscribe((data: any) => {
          callback(null, Product.arrayConstructor(data))
        }, error => {
          callback(error, null)
        })
    }
    else {
      self.getCount(function (error, count) {
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


  getCount(callback) {
    this.mainSer.APIServ.get("products/count")
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
