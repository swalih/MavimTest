import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  message: String = "";
  show = false;

  constructor(private service: MessageService) { }

  ngOnInit(): void {
    this.service.getMessage()
    .subscribe(msg => {
      this.show = true;
      this.message = msg;
      
      setTimeout(() => {
        this.message = "";
        this.show = false;
      }, 5000);
    });
  }

  setShow(val: boolean){
    this.show = val;
  }

}
