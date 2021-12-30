import { Component, OnInit } from '@angular/core';
import { MessageService } from './message.service';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Pizza Ordering System';
  
  constructor(private userService: UserService,
    private msgService: MessageService,
    private router: Router) { }

  userLoggedIn(){
    return this.userService.user_logged_in;
  }

  ngOnInit(){
    //this.msgService.postMessage("");
  }

  signOut(){
    this.userService.clearUser();
    this.router.navigate(["/", "signout"]);
  }

}
