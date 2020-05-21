import { LoaderService } from './loader.service';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { appError } from '../models/app-error.model';
// import { Ng2ImgMaxService } from 'ng2-img-max';

@Injectable()
export class ApiService {

  constructor(public http: HttpClient, private authSer: AuthService, private loaderSer: LoaderService) {
  }
  //readonly baseUrl = "http://localhost:3000/api/"
  readonly baseUrl = "https://crownsoflight.ca:3000/api/"





  private createUrlString(index, variables, filter, ordering) {
    // let url = this.constURL[index];
    // for (var key in variables) {
    //   console.log("{{" + key + "}}")
    //   url = url.replace(new RegExp("{{" + key + "}}", "g"), variables[key]);
    //   console.log(url);
    // };
    // if (filter != null || ordering != null)
    //   url += "?";

    // if (filter != null) {
    //   for (var key in filter) {
    //     url += key + "=" + filter[key] + "&"
    //   };
    // }
    // if (ordering != null) {
    //   url += "ordering=" + ordering
    // }
    return "";
  }

  private handleError(error: Response | any) {
    console.log("error")
    console.log(error)
    if (error.status == 401)
       //this.authSer.logout()
      window.location.href = "https://crownsoflight.ca/dashboard/#/login";
    return Observable.throw(new appError(error))
  }






  login(url, data) {
    let mainUrl = this.baseUrl + url
    let _options = { headers: new HttpHeaders({ 'responseType': 'text', 'Content-Type': 'application/json', 'Accept': 'application/json' }) };

    return this.http.post(mainUrl, data, _options).map((Response: Response) => {
      return Response;
    }).catch(this.handleError);
  }





  get(url, token: string = "") {
    this.loaderSer.display(true);
    let self = this;
    let auth = "";
    if (token != "")
      auth = token
    else if (this.authSer.isLogin()) {
      auth = this.authSer.getToken();
    }
    // let url = this.createUrlString(urlObject.index, urlObject.variables, urlObject.filter, urlObject.ordering)
    let mainUrl = this.baseUrl + url
    let _options = { headers: new HttpHeaders({ "Authorization": auth }) };

    return this.http.get(mainUrl, _options)
      .finally(function () {
        self.loaderSer.display(false);
      })
      .catch(this.handleError)
  }




  uploadImage(url, data, length, token: string = ""): Observable<Response> {
    this.loaderSer.display(true);
    let mainUrl = this.baseUrl + url
    let fd = new FormData();
    var self = this;
    // return new Observable(function () {
    // mainthis.ng2ImgMax.compress(data, 0.5, true, true).subscribe((result) => {
    // console.log(data);
    for (var index = 0; index < length; index++) {
      fd.append("file", data[index], data[index].name)
    }
    let auth = "";
    if (token != "")
      auth = token
    else if (self.authSer.getToken() != null) {
      auth = self.authSer.getToken();
    }
    let _options = { headers: new HttpHeaders({ "Authorization": auth }) };
    console.log("auth")
    console.log(auth)
    console.log("getToken")
    console.log(self.authSer.getToken())
    return self.http.post(mainUrl, fd).timeout(90000).map((Response: Response) => {
      return (Response);
    })
      .finally(function () {
        self.loaderSer.display(false);
      })
      .catch((self.handleError));
    // })
    //   });
  }


  post(url, data, token: string = "") {
    this.loaderSer.display(true);
    let self = this;
    let auth = "";
    if (token != "")
      auth = token
    else if (this.authSer.isLogin()) {
      auth = this.authSer.getToken();
    }
    let mainUrl = this.baseUrl + url //.createUrlString(urlObject.index, urlObject.variables, urlObject.filter, urlObject.ordering)

    let _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": auth }) };

    return this.http.post(mainUrl, data, _options)
      .finally(function () {
        self.loaderSer.display(false);
      })
      .catch(this.handleError)
  }

  put(url, data, token: string = "") {
    this.loaderSer.display(true);
    let self = this;

    let auth = "";
    if (token != "")
      auth = token
    else if (this.authSer.isLogin()) {
      auth = this.authSer.getToken();
    }
    let mainUrl = this.baseUrl + url//createUrlString(urlObject.index, urlObject.variables, urlObject.filter, urlObject.ordering)

    let _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": auth }) };

    return this.http.put(mainUrl, data, _options)
      .finally(function () {
        self.loaderSer.display(false);
      })
      .catch(this.handleError)
  }

  delete(url, token: string = "") {
    this.loaderSer.display(true);
    let self = this;

    let auth = "";
    if (token != "")
      auth = token
    else if (this.authSer.isLogin()) {
      auth = this.authSer.getToken();
    }
    let mainUrl = this.baseUrl + url//this.createUrlString(urlObject.index, urlObject.variables, urlObject.filter, urlObject.ordering)

    let _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json', "Authorization": auth }) };

    return this.http.delete(mainUrl, _options)
      .finally(function () {
        self.loaderSer.display(false);
      })
      .catch(this.handleError)
  }
}
