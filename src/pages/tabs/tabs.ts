import { Component } from '@angular/core';
import { NavParams ,NavController} from 'ionic-angular';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { Login } from '../login/login';
import { Storage } from '@ionic/storage'


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  private student={username:''};
  tab1Root = HomePage;
  tab2Root = AboutPage;
  tab3Root = ContactPage;

  constructor(public storage:Storage,public navCtrl: NavController,public navParams: NavParams) {
      this.student.username = this.navParams.get("username");
  }

  logout(){
      this.storage.ready().then(()=>{
            this.storage.remove('user');
            this.storage.remove('token');
            this.navCtrl.push(Login);    
          });
  }

}
