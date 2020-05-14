// import { Center } from './../../models/center.model';
import { MainService } from '../../service/main.service';
import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
@Injectable()
export class UserService {

  constructor(private mainSer: MainService) { }


  getOneObject(id, callback) {
    this.mainSer.APIServ.get("users/" + id)
      .subscribe((data: any) => {
        callback(null, new User(data))
      }, error => {
        callback(error, null)
      })
  }


  createItem(data, callback) {
    this.mainSer.APIServ.post("users", data)
      .subscribe((data: any) => {
        callback(null, data)
      }, error => {
        callback(error, null)
      })
  }

  updateItem(data, id, callback) {
    delete data.id
    this.mainSer.APIServ.put("users/" + id, data)
      .subscribe((data: any) => {
        callback(null, data)
      }, error => {
        callback(error, null)
      })
  }

  resetPassword(data, id, callback) {
    delete data.id
    this.mainSer.APIServ.put("users/" + id + "/changePassword", data)
      .subscribe((data: any) => {
        callback(null, data)
      }, error => {
        callback(error, null)
      })
  }


  getPurshesPaginationObject(userId, limit, offset, callback) {
    let self = this
    var filter = { "limit": limit, "offset": offset, "where": { "userId": userId } }
    if (offset != 0) {

      self.mainSer.APIServ.get("purchases?filter=" + JSON.stringify(filter))
        .subscribe((data: any) => {
          callback(null, data)
        }, error => {
          callback(error, null)
        })
    }
    else {
      self.getCountPurchase(userId, function (error, count) {
        if (error)
          callback(error, null)
        else {
          self.mainSer.APIServ.get("purchases?filter=" + JSON.stringify(filter))
            .subscribe((data: any) => {
              callback(null, data, count)
            }, error => {
              callback(error, null)
            })
        }
      })
    }
  }


  getPaginationObject(whereObject, limit, offset, callback) {
    let self = this
    var filter = { "limit": limit, "offset": offset, "where": whereObject }
    if (offset != 0) {

      self.mainSer.APIServ.get("users?filter=" + JSON.stringify(filter))
        .subscribe((data: any) => {
          callback(null, User.arrayConstructor(data))
        }, error => {
          callback(error, null)
        })
    }
    else {
      self.getCount(whereObject, function (error, count) {
        if (error)
          callback(error, null)
        else {
          self.mainSer.APIServ.get("users?filter=" + JSON.stringify(filter))
            .subscribe((data: any) => {
              callback(null, User.arrayConstructor(data), count)
            }, error => {
              callback(error, null)
            })
        }
      })
    }
  }

  getCountPurchase(userId, callback) {
    let where = { "userId": userId }
    this.mainSer.APIServ.get("purchases/count?where=" + JSON.stringify(where))
      .subscribe((data: any) => {
        callback(null, data.count)
      }, error => {
        callback(error, null)
      })
  }

  getCount(whereObject, callback) {
    this.mainSer.APIServ.get("users/count?where=" + JSON.stringify(whereObject))
      .subscribe((data: any) => {
        callback(null, data.count)
      }, error => {
        callback(error, null)
      })
  }

  getAllObject(callback) {
    this.mainSer.APIServ.get("users")
      .subscribe((data: any) => {
        callback(null, User.arrayConstructor(data))
      }, error => {
        callback(error, null)
      })
  }


}
