import { appError } from './../../../models/app-error.model';
import { DialogService } from './../../../service/dialog.service';
import { ActivatedRoute } from '@angular/router';
import { MainService } from './../../../service/main.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Image } from '../../../models/image.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  // validatyion variable
  public isSubmitted: boolean = false
  public message: string = "";

  public isUpdate: boolean = false;
  public id: number;




  userForm = new FormGroup({
    email: new FormControl("", Validators.required),
    name: new FormControl("", Validators.required),
    gender: new FormControl("", Validators.required),
    birthdate: new FormControl(""),
    password: new FormControl("", Validators.required),
    points: new FormControl(0, Validators.required),
    phone: new FormControl("")
  });

  // constArray
  public languageKey = this.mainSer.globalServ.getLanguageKey()
  public imageObject: Image;

  constructor(private mainSer: MainService, private routeSer: ActivatedRoute, private userSer: UserService, private dialogSer: DialogService) {
    var self = this;
    this.routeSer.params.subscribe(params => {
      if (params['id']) {
        self.userForm.removeControl('password')
        this.isUpdate = true
        this.id = params['id']
        this.userSer.getOneObject(this.id, function (err: appError, data) {
          self.userForm.patchValue(data);
          self.userForm.patchValue({ "birthdate": data.birthdate.toISOString().split('T')[0] })
          self.imageObject = data.image
        });
      }
    });

  }

  parseDate(s) {
    var b = s.split(/\D/);
    return new Date(b[0], --b[1], b[2]);
  }
  ngOnInit() {
    var self = this;

  }

  createObject() {
    let self = this;
    let body = this.userForm.value;
    if (self.imageObject)
      body['mediaId'] = self.imageObject.id
    this.userSer.createItem(body, function (err: appError, data) {
      if (err) {
        err.returnMessage();
        return;
      }
      self.dialogSer.successMessage(false, function () {
        self.back()
      })
    })
  }

  updateObject() {
    let self = this;
    let body = this.userForm.value;
    this.userSer.updateItem(body, self.id, function (err: appError, data) {
      if (err) {
        err.returnMessage();
        return;
      }
      self.dialogSer.successMessage(true, function () {
        self.back()
      })
    })
  }

  onFormSubmit() {
    var self = this;
    if (this.userForm.valid == false) {
      this.isSubmitted = true;
      return
    }
    if (!self.isUpdate) {
      self.createObject();
    }
    else {
      self.updateObject()
    }
  }

  imageChangeCallback(data) {
    this.imageObject = data;
    this.isSubmitted = false;
  }
  back() {
    this.mainSer.globalServ.goTo("list-user")
  }

}
