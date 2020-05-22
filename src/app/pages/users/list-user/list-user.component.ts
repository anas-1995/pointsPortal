import { appError } from './../../../models/app-error.model';
import { MainService } from './../../../service/main.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { UserService } from '../user.service';
import { DialogService } from '../../../service/dialog.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  public limit: number = 30
  public offset: number = 0
  public count: number = 0
  public keyWord: string = "";
  public orderBy: string = "name asc";

  arrayUser: User[] = []
  // public languageKey = this.mainSer.globalServ.getLanguageKey()

  fields = [
    { "key": "email", "label": "GLOBAL.EMAIL", "type": "string" },
    { "key": "name", "label": "GLOBAL.NAME", "type": "string" },
    { "key": "points", "label": "GLOBAL.POINTS", "type": "price" },
    { "key": "gender", "label": "GLOBAL.GENDER", "type": "gender" },
    {
      "type": "buttons", "label": "", "isIcon": false, "buttons": [
        { "type": "success", "action": "edit", "label": "GLOBAL.EDIT" },
        { "type": "warning", "action": "resetPassword", "label": "GLOBAL.RESETPASSWORD" },
        { "type": "danger", "action": "delete", "label": "GLOBAL.DELETE" }
      ]
    }

  ]
  constructor(private userSer: UserService, private mainSer: MainService, private dialogSer: DialogService) { }

  ngOnInit() {
    this.getData()
  }

  addUser() {
    this.mainSer.globalServ.goTo('add-user')
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
    let whereObject = { "or": [{ "name": this.getRegex(self.keyWord) }, { "email": this.getRegex(self.keyWord) }] }

    self.userSer.getPaginationObject(whereObject, self.limit, self.offset, self.orderBy, function (err: appError, data, count) {
      if (err)
        return err.returnMessage()
      self.arrayUser = data;
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
  action(data) {
    let self = this
    if (data.event == 'edit') {
      this.mainSer.globalServ.goTo("edit-user/" + data.id)
    }
    else if (data.event == 'resetPassword') {
      self.dialogSer.resetPassword(self.arrayUser[data.index], function () {

      })
    }
    else if (data.event == 'delete') {

      this.dialogSer.confirmMessage("delete", function () {
        // alert("SSS");
        self.userSer.delete(data.id, function () {
          self.getData()
        })
      })
    }
  }

}
