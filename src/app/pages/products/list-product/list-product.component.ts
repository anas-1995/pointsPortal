import { appError } from './../../../models/app-error.model';
import { MainService } from './../../../service/main.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ProductService } from '../product.service';
import { DialogService } from '../../../service/dialog.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

  public keyWord: string = "";
  public limit: number = 10
  public offset: number = 0
  public count: number = 0
  arrayProduct: Product[] = []
  // public languageKey = this.mainSer.globalServ.getLanguageKey()

  fields = [
    { "key": "nameEn", "label": "GLOBAL.NAMEEN", "type": "string" },
    { "key": "nameAr", "label": "GLOBAL.NAMEAR", "type": "string" },
    { "key": "nameFr", "label": "GLOBAL.NAMEFR", "type": "string" },
    { "key": "price", "label": "GLOBAL.PRICE", "type": "price" },
    { "key": "quantity", "label": "GLOBAL.QUANTITY", "type": "string" },
    { "key": "purchaseCount", "label": "GLOBAL.PURCHASECOUNT", "type": "string" },
    {
      "type": "buttons", "label": "", "isIcon": false, "buttons": [
        { "type": "success", "action": "edit", "label": "GLOBAL.EDIT" },
        { "type": "danger", "action": "delete", "label": "GLOBAL.DELETE" }

      ]
    }

  ]
  constructor(private productSer: ProductService, private mainSer: MainService, private dialogSer: DialogService) { }

  ngOnInit() {
    this.getData()
  }

  addProduct() {
    this.mainSer.globalServ.goTo('add-product')
  }

  changePages(page) {
    console.log(page);
    this.offset = (page - 1) * this.limit;
    this.getData()
  }
  getData() {
    var self = this;
    let whereObject = { "or": [{ "descriptionEn": this.getRegex(self.keyWord) }, { "descriptionAr": this.getRegex(self.keyWord) }, { "descriptionFr": this.getRegex(self.keyWord) }, { "nameEn": this.getRegex(self.keyWord) }, { "nameAr": this.getRegex(self.keyWord) }, { "nameFr": this.getRegex(self.keyWord) }] }

    self.productSer.getPaginationObject(whereObject, self.limit, self.offset, function (err: appError, data, count) {
      if (err)
        return err.returnMessage()
      self.arrayProduct = data;
      if (count)
        self.count = count;
    })
  }

  getRegex(string) {
    var pattern = new RegExp('.*' + string + '.*', "i"); /* case-insensitive RegExp search */
    return { regexp: pattern.toString() }
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

  action(data) {
    let self = this
    if (data.event == 'edit') {
      this.mainSer.globalServ.goTo("edit-product/" + data.id)
    }
    else if (data.event == 'delete') {
      this.dialogSer.confirmMessage("delete", function () {
        // alert("SSS");
        self.productSer.updateItem({ "deleted": true }, data.id, function () {
          self.getData()
        })
      })
    }
  }

}
