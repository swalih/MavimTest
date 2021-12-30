import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { UserService } from '../user.service';

import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  signInMode = true;
  user: User = {
    'username': "",
    'password': ""
  };

  show_un_error = false;
  show_pw_error = false;
  username_error = "";
  password_error = "";

  constructor(private service: UserService,
              private router: Router,
              private location: Location) { }

  ngOnInit(): void {
    //console.log(this.router.url);
    if(this.router.url == "/signout"){
      this.signInMode = false;
    }
    else
      this.signInMode = true;
  }

  login(){
    this.show_pw_error = this.show_un_error = false;
    if(this.validate()){
        let valid = this.service.verifyUser(this.user);
        //valid.subscribe(data => console.log(data));
        if(valid){
          this.router.navigate(['/', 'list', {'logged_in': true}]);
        }
    }
  }

  validate(){
    if(this.user.username.length <= 0 || !this.user.username.match(/[A-Za-z0-9]+/)){
      this.username_error = "User is either empty or is using unexpected characters.";
      this.show_un_error = true;
    }
    if(this.user.password.length <= 0){
      this.password_error = "Password can't be empty.";
      this.show_pw_error = true;
    }
 
    return !(this.show_pw_error || this.show_un_error); //i.e, validated if no error is shown.
  }

}
