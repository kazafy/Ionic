import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { Storage } from '@ionic/storage'

import 'rxjs/add/operator/map';

/*
  Generated class for the HttpClient provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HttpClient {

  constructor(public storage:Storage,public http: Http) {
    console.log('Hello HttpClient Provider');
  }
  token="";
  headers:Headers;
  appendToken(header){
    this.headers = header||new Headers();
    this.headers.append("Content-Type","application/json");
    this.storage.ready().then(()=>{
      this.storage.get('token').then((token)=>{this.token = token})
    });    
    this.headers.append("Authorization","Bearer "+this.token);    
  }

  public get(url:string , header:Headers = new Headers()){
    this.appendToken(header);
    return this.http.get(url,{headers:this.headers});
  }

  public post(url:string ,data, header:Headers = new Headers()){    
    this.appendToken(header);
    return this.http.post(url,data,{headers:this.headers});
  }

  public put(url:string ,data, header:Headers = new Headers()){    
    this.appendToken(header);
    return this.http.put(url,data,{headers:this.headers});  
  }  

  public delete(url:string , header:Headers = new Headers()){    
    this.appendToken(header);
    return this.http.delete(url,{headers:this.headers});  
  }


}
