import { appError } from './../../../models/app-error.model';
import { MainService } from './../../../service/main.service';
import { Component, OnInit } from '@angular/core';
import { Category } from '../../../models/category.model';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.css']
})
export class ListCategoryComponent implements OnInit {

  public limit: number = 10
  public offset: number = 0
  public count: number = 0
  arrayCategory: Category[] = []
  // public languageKey = this.mainSer.globalServ.getLanguageKey()

  fields = [
    { "key": "nameEn", "label": "GLOBAL.NAMEEN", "type": "string" },
    { "key": "nameAr", "label": "GLOBAL.NAMEAR", "type": "string" },
    { "key": "nameFr", "label": "GLOBAL.NAMEFR", "type": "string" },
    {
      "type": "buttons", "label": "", "isIcon": false, "buttons": [
        { "type": "success", "action": "edit", "label": "GLOBAL.EDIT" }
      ]
    }

  ]
  constructor(private categorySer: CategoryService, private mainSer: MainService) { }

  ngOnInit() {
    this.getData()
  }

  addCategory() {
    this.mainSer.globalServ.goTo('add-category')
  }

  changePages(page) {
    console.log(page);
    this.offset = (page - 1) * this.limit;
    this.getData()
  }
  getData() {
    var self = this;
    self.categorySer.getPaginationObject(self.limit, self.offset, function (err: appError, data, count) {
      if (err)
        return err.returnMessage()
      self.arrayCategory = data;
      if (count)
        self.count = count;
    })
  }

  action(data) {
    if (data.event == 'edit') {
      this.mainSer.globalServ.goTo("edit-category/" + data.id)
    }
  }

}