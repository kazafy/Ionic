import { Injectable } from '@angular/core';
import { HttpClient} from './http-client'
import 'rxjs/add/operator/map';

/*
  Generated class for the User provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/

@Injectable()
export class User {

  url = "http://attendance-ionic-symfony-react.herokuapp.com/";

  constructor(public http: HttpClient) {
    console.log('Hello User Provider');
  }

  public doLogin(student){

    return this.http.post(this.url+"login",JSON.stringify(student)).map(res=>res.json());
  }

  public sendRequset(request,id){
    return this.http.post(this.url+"api/requests",JSON.stringify(request)).map(res=>res.json());    
  }

  public sendQR(qr){
    return this.http.post(this.url+"api/studentsAttendance/",{qr:qr}).map(res=>res.json());        
  }

  public getAttendance(id){
    return this.http.get(this.url+"api/studentsAttendance/"+id).map(res=>res.json());        
  }

  public getRequsets(id){
    return this.http.get(this.url+"api/requests/"+id).map(res=>res.json());        
  }

}
