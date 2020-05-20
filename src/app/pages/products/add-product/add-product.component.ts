import { appError } from './../../../models/app-error.model';
import { DialogService } from './../../../service/dialog.service';
import { ActivatedRoute } from '@angular/router';
import { MainService } from './../../../service/main.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Image } from '../../../models/image.model';
import { ProductService } from '../product.service';
import { CategoryService } from '../../categories/category.service';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  // validatyion variable
  public isSubmitted: boolean = false
  public message: string = "";
  public categories: Category[]
  public isUpdate: boolean = false;
  public id: number;
  public arrayImage: Image[] = []



  productForm = new FormGroup({
    nameEn: new FormControl("", Validators.required),
    nameAr: new FormControl("", Validators.required),
    nameFr: new FormControl("", Validators.required),
    descriptionEn: new FormControl("", Validators.required),
    descriptionFr: new FormControl("", Validators.required),
    descriptionAr: new FormControl("", Validators.required),
    quantity: new FormControl(0, Validators.required),
    price: new FormControl(0, Validators.required),
    categoryId: new FormControl("", Validators.required),
  });

  // constArray
  public languageKey = this.mainSer.globalServ.getLanguageKey()
  public imageObject: Image;

  constructor(private mainSer: MainService, private categorySer: CategoryService, private routeSer: ActivatedRoute, private productSer: ProductService, private dialogSer: DialogService) {
    var self = this;
    this.routeSer.params.subscribe(params => {
      if (params['id']) {
        this.isUpdate = true
        this.id = params['id']
        this.productSer.getOneObject(this.id, function (err: appError, data) {
          self.productForm.patchValue(data);
          self.arrayImage = data.images
        });
      }
    });

  }

  ngOnInit() {
    var self = this;
    self.categorySer.getAllObject(function (err: appError, data) {
      if (err)
        return err.returnMessage()
      self.categories = data;
    })

  }

  createObject() {
    let self = this;
    let body = this.productForm.value;
    let imagesId = []
    self.arrayImage.forEach(element => {
      imagesId.push(element.id)
    });
    this.productSer.createItem({ "data": body, "imagesId": imagesId }, function (err: appError, data) {
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
    let body = this.productForm.value;
    let imagesId = []
    self.arrayImage.forEach(element => {
      imagesId.push(element.id)
    });

    this.productSer.updateItem({ "data": body, "imagesId": imagesId }, self.id, function (err: appError, data) {
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
    if (this.productForm.valid == false) {
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
    this.mainSer.globalServ.goTo("list-product")
  }

}
