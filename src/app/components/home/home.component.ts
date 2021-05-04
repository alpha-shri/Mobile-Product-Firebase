import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { FireBaseService } from 'src/app/services/fire-base.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public fireBase: FireBaseService) { }
  @Output() isLogOut = new EventEmitter();

  // isLoggedIn = false;

  ngOnInit(): void {
  }

  logOut(){
    this.fireBase.logOutService();
    this.isLogOut.emit;
  }

}