import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker'
import { User } from '../../providers/user'
import { Storage } from '@ionic/storage'

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
  providers:[DatePicker,User]
})
export class ContactPage {
  private showOnLate = false;
  private requestType ="absent";
  private selectedDate = new Date();
  private selectedTime = new Date();
  private hoursLate = 1;
  private requestBody="";
  private requests = [];
  private student ={id:''};
  constructor(public storage:Storage,private user:User,private datePicker: DatePicker, public navCtrl: NavController) {      

    this.storage.ready().then(()=>{
      this.storage.get('user').then((u)=>{
          this.student=u;
          this.user.getRequsets(this.student.id).subscribe(res=>{
            this.requests = res;
            alert(res);
          })
        })
    });
  }

  showDatePicker(mode){
    this.datePicker.show({
      date: new Date(),
      mode: mode,
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => {
                if(mode=='date') 
                    this.selectedDate=date;
                  else
                    this.selectedTime=date;
              },
      err => console.log('Error occurred while getting date: ', err)
      );
  }
  sendRequest(){
    let request = { type:(this.requestType=='absent')?1:2 ,
                    targetDate:this.selectedTime ,
                    body:this.requestBody,
                    hoursLate:this.hoursLate
                  };

    let user;
    this.storage.ready().then(()=>{
      this.storage.get('user').then((u)=>{
        this.user.sendRequset(request,u.id)
                  .subscribe(res=>{
                    this.reset();           
                  },err=>alert(err))

      })
    });


  }

  test(){
    this.showOnLate = (this.requestType=="late")    
  }

  reset(){
    this.requestBody="";
    this.selectedDate= new Date();
    this.selectedTime= new Date();
    this.requestType = "absent";
    this.showOnLate = false;
  }

}
