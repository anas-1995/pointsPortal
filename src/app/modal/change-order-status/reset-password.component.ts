import { FailedComponent } from './../failed/failed.component';
import { appError } from './../../models/app-error.model';
import { MainService } from '../../service/main.service';
import { Component, Input, OnInit } from '@angular/core';




import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DialogService } from '../../service/dialog.service';
import { User } from '../../models/user.model';
import { UserService } from '../../pages/users/user.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  @Input() user: User;
  newPassword: string = ""
  public languageKey = this.mainSer.globalServ.getLanguageKey()
  public message: string = "";
  constructor(public activeModal: NgbActiveModal, private modalService: NgbModal, private mainSer: MainService, private userSer: UserService) {
  }


  change() {
    let self = this;
    this.userSer.resetPassword({ "newPassword": this.newPassword }, this.user.id, function (err: appError, data) {
      self.activeModal.close(true)
    })
  }

  ngOnInit() {
  }
  close() {
    this.activeModal.close()
  }
}
