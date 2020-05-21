// import { Center } from './../../models/center.model';
import { MainService } from '../../service/main.service';
import { Injectable } from '@angular/core';

@Injectable()
export class PurchasesService {

  constructor(private mainSer: MainService) { }


  getPurshesPaginationObject(whereObject, limit, offset, callback) {
    let self = this
    var filter = { "limit": limit, "offset": offset ,"where":whereObject, "order": "createdAt desc"}
    if (offset != 0) {

      self.mainSer.APIServ.get("purchases?filter=" + JSON.stringify(filter))
        .subscribe((data: any) => {
          callback(null, data)
        }, error => {
          callback(error, null)
        })
    }
    else {
      self.getCountPurchase(whereObject, function (error, count) {
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

  getCountPurchase(whereObject, callback) {
    this.mainSer.APIServ.get("purchases/count?where=" + JSON.stringify(whereObject))
      .subscribe((data: any) => {
        callback(null, data.count)
      }, error => {
        callback(error, null)
      })
  }

}
