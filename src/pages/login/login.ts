import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { User }from '../../providers/user'
import { Storage } from '@ionic/storage'

import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the Login page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[User]
})
export class Login {
  private student={username:"",password:""};
  private errMessage="";
  private finished = true;
  constructor(public storage:Storage,public user: User,public navCtrl: NavController, public navParams: NavParams) {
        this.storage.ready().then(()=>{
        this.storage.get('user').then((u)=>{
          if(u){
              this.navCtrl.push(TabsPage,{'username':"admin"});
          }          
        })
        });

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad Login');
  }
  public login (){
    this.finished = false;
    this.user.doLogin(this.student).subscribe(res=>{
      if(res.token){
        this.storage.ready().then(()=>{
          this.storage.set('token',res.token);
          this.storage.set('user',{username:"kazafy",id:1});
          // this.storage.set('user',res.user);
          // this.navCtrl.push(TabsPage,{'username':res.user.username});
           this.navCtrl.push(TabsPage,{'username':"admin"});
        });
      }else{
        this.errMessage=res;
      }
    },
    error => this.errMessage = "err "+error,
    () => this.finished = true
    );
  }
}
