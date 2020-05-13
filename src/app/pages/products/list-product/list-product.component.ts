import { appError } from './../../../models/app-error.model';
import { MainService } from './../../../service/main.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../../models/product.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.css']
})
export class ListProductComponent implements OnInit {

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
  constructor(private productSer: ProductService, private mainSer: MainService) { }

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
    self.productSer.getPaginationObject(self.limit, self.offset, function (err: appError, data, count) {
      if (err)
        return err.returnMessage()
      self.arrayProduct = data;
      if (count)
        self.count = count;
    })
  }

  action(data) {
    if (data.event == 'edit') {
      this.mainSer.globalServ.goTo("edit-product/" + data.id)
    }
    else if (data.event == 'delete') {
    }
  }

}
