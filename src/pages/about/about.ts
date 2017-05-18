import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { User }from '../../providers/user'
import { Storage } from '@ionic/storage'

@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
  providers:[User]

})
export class AboutPage {
  public attendanceList=[
          ];
  constructor(private storage:Storage ,public user:User ,public navCtrl: NavController) {
    this.storage.ready().then(()=>{
      this.storage.get('user').then((u)=>{
        this.user.getAttendance(u.id).
        subscribe(res=>{
          this.attendanceList=res;
        },
        err=>{
          alert (err);
        })
      })
  },err=>{});

}

}
