import { appError } from './../../../models/app-error.model';
import { DialogService } from './../../../service/dialog.service';
import { ActivatedRoute } from '@angular/router';
import { MainService } from './../../../service/main.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../category.service';
import { Image } from '../../../models/image.model';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {

  // validatyion variable
  public isSubmitted: boolean = false
  public message: string = "";

  public isUpdate: boolean = false;
  public id: number;




  categoryForm = new FormGroup({
    nameEn: new FormControl("", Validators.required),
    nameAr: new FormControl("", Validators.required),
    nameFr: new FormControl("", Validators.required),
  });

  // constArray
  public languageKey = this.mainSer.globalServ.getLanguageKey()
  public imageObject: Image;

  constructor(private mainSer: MainService, private routeSer: ActivatedRoute, private categorySer: CategoryService, private dialogSer: DialogService) {
    var self = this;
    this.routeSer.params.subscribe(params => {
      if (params['id']) {
        this.isUpdate = true
        this.id = params['id']
        this.categorySer.getOneObject(this.id, function (err: appError, data) {
          self.categoryForm.patchValue(data);
          self.imageObject = data.image
        });
      }
    });

  }

  ngOnInit() {
    var self = this;

  }

  createObject() {
    let self = this;
    let body = this.categoryForm.value;
    if (self.imageObject)
      body['mediaId'] = self.imageObject.id
    this.categorySer.createItem(body, function (err: appError, data) {
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
    let body = this.categoryForm.value;
    this.categorySer.updateItem(body, self.id, function (err: appError, data) {
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
    if (this.categoryForm.valid == false) {
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
    this.mainSer.globalServ.goTo("list-category")
  }

}
