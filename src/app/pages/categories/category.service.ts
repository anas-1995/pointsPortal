// import { Center } from './../../models/center.model';
import { MainService } from '../../service/main.service';
import { Injectable } from '@angular/core';
import { Category } from '../../models/category.model';

@Injectable()
export class CategoryService {

  constructor(private mainSer: MainService) { }


  getOneObject(id, callback) {
    this.mainSer.APIServ.get("categories/" + id)
      .subscribe((data: any) => {
        callback(null, new Category(data))
      }, error => {
        callback(error, null)
      })
  }


  createItem(data, callback) {
    this.mainSer.APIServ.post("categories", data)
      .subscribe((data: any) => {
        callback(null, data)
      }, error => {
        callback(error, null)
      })
  }

  updateItem(data, id, callback) {
    delete data.id
    this.mainSer.APIServ.put("categories/" + id, data)
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

      self.mainSer.APIServ.get("categories?filter=" + JSON.stringify(filter))
        .subscribe((data: any) => {
          callback(null, Category.arrayConstructor(data))
        }, error => {
          callback(error, null)
        })
    }
    else {
      self.getCount(whereObject, function (error, count) {
        if (error) {
          callback(error, null)
        }
        else {
          self.mainSer.APIServ.get("categories?filter=" + JSON.stringify(filter))
            .subscribe((data: any) => {
              callback(null, Category.arrayConstructor(data), count)
            }, error => {
              callback(error, null)
            })
        }
      })
    }
  }


  getCount(whereObject, callback) {
    this.mainSer.APIServ.get("categories/count?where=" + JSON.stringify(whereObject))
      .subscribe((data: any) => {
        callback(null, data.count)
      }, error => {
        callback(error, null)
      })
  }

  getAllObject(callback) {
    this.mainSer.APIServ.get("categories")
      .subscribe((data: any) => {
        callback(null, Category.arrayConstructor(data))
      }, error => {
        callback(error, null)
      })
  }


}
