import { appError } from './../../../models/app-error.model';
import { MainService } from './../../../service/main.service';
import { Component, OnInit } from '@angular/core';
import { PurchasesService } from '../purchases.service';
import { DialogService } from '../../../service/dialog.service';

@Component({
  selector: 'app-list-purchases',
  templateUrl: './list-purchases.component.html',
  styleUrls: ['./list-purchases.component.css']
})
export class ListPurchasesComponent implements OnInit {

  public limit: number = 30
  public offset: number = 0
  public count: number = 0
  public keyWord: string = "";
  public orderBy: string = "createdAt desc";

  arrayPurchase: any[] = []


  constructor(private purchaseSer: PurchasesService, private mainSer: MainService, private dialogSer: DialogService) { }

  ngOnInit() {
    this.getData()
  }


  changePages(page) {
    console.log(page);
    this.offset = (page - 1) * this.limit;
    this.getData()
  }
  changeOrderBy(field){
    this.orderBy = field;
    this.getData();
  }
  getData() {
    var self = this;
    let whereObject = { "or": [{ "productId": this.getRegex(self.keyWord) }, { "productId": this.getRegex(self.keyWord) }, { "productId": this.getRegex(self.keyWord) }] }
    self.purchaseSer.getPurshesPaginationObject(whereObject, self.limit, self.offset, self.orderBy, function (err: appError, data, count) {
      if (err)
        return err.returnMessage()
      self.arrayPurchase = data;
      if (count)
        self.count = count;
    })
  }

  changedKeyWord(value) {
    let self = this
    setTimeout(() => {
      if (self.keyWord == value) {
        self.offset = 0
        self.getData()
      }
    }, 1500);
  }

  getRegex(string) {
    var pattern = new RegExp('.*' + string + '.*', "i"); /* case-insensitive RegExp search */
    return { regexp: pattern.toString() }
  }




  fields = [
    { "key": "user.name", "label": "GLOBAL.USER", "type": "object" },
    { "key": "price", "label": "GLOBAL.PRICE", "type": "price" },
    { "key": "quantity", "label": "GLOBAL.QUANTITY", "type": "string" },
    { "key": "product.nameEn", "label": "GLOBAL.PRODUCT", "type": "object" },
    { "key": "productId", "label": "GLOBAL.PRODUCTID", "type": "string" },
    { "key": "createdAt", "label": "GLOBAL.CREATED_AT", "type": "date", "viewDate": true }

  ]
}
