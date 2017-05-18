import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { User }from '../../providers/user'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[BarcodeScanner,User]
})
export class HomePage {

  constructor(private user:User,private barcodeScanner: BarcodeScanner,public navCtrl: NavController) {
  }
  scan(){
    this.barcodeScanner.scan().then((barcodeData) => {
    // Success! Barcode data is here
      this.user.sendQR(barcodeData.text).subscribe(
        res=>{
          alert("ok")
        },
        err=>{
          alert("error")
        }
      )

    }, (err) => {
        // An error occurred
        alert('err'+err)
    });

  }


}
