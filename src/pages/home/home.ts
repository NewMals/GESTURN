import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  displayName;  

  constructor(public navCtrl: NavController,
    private afAuth: AngularFireAuth) {
      afAuth.authState.subscribe(user => {
        if (!user) {
          this.displayName = null;        
          return;
        }
        this.displayName = user.displayName;      
      });
  }

  signInWithGoogle() {
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(res => {
        this.navCtrl.setRoot('ListadoPage')
      });
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

}
