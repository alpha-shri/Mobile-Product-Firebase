import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FireBaseService } from './services/fire-base.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  isSignedIn = false;
  isLoggedIn = false;

  constructor(private fireBaseService: FireBaseService){  }

  ngOnInit(): void{
    console.log(`IsLoggedIn: ${this.isLoggedIn} || isSignedIn: ${this.isSignedIn}`);
    
    if(localStorage.getItem('user') !== null){
        this.isSignedIn = true
        this.isLoggedIn = true;
    }else{
      this.isSignedIn = false
      this.isLoggedIn = true;
    }

    
  }

  onSignUp(email, password){
      console.log(`Inside onSignUp ${email} and ${password}`);
      
      this.fireBaseService.signUpService(email, password);
      if(this.fireBaseService.isLoggedIn){
        this.isSignedIn = true
      }
      console.log(`IsLoggedIn: ${this.isLoggedIn} || isSignedIn: ${this.isSignedIn}`);
         
  }

  onSignIn(email, password){
    console.log(`Inside onSignIn ${email} and ${password}`);
    this.fireBaseService.signInService(email, password)
    if(this.fireBaseService.isLoggedIn){
      this.isSignedIn = true;
      this.isLoggedIn = true;
    }
    console.log(`IsLoggedIn: ${this.isLoggedIn} || isSignedIn: ${this.isSignedIn}`);
  }

  handleLogOut(){
    this.isSignedIn = false;
  }
}
