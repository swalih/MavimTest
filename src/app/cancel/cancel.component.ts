import { Component, OnInit } from '@angular/core';
import { PizzaService } from '../pizza.service';
import { MessageService } from '../message.service';
import { Router } from '@angular/router';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.css']
})
export class CancelComponent implements OnInit {
 
  delete_id = 0;

  constructor(private service: PizzaService, private msg: MessageService,
        private router: Router) { }

  ngOnInit(): void {
    let url = this.router.url;
    let id = url.substring(url.lastIndexOf('/') + 1);

    if(id.match(/[0-9]+/) && parseInt(id) > 0){ //id is an integer and is greater than 0
      this.deleteOrder(id);
    }
  }

  deleteOrder(id: any){
    this.service.cancelOrder(parseInt(id))
    .subscribe(res => {
      //debugger;
      if(res instanceof HttpErrorResponse){
        if(res.status == 404)
          this.msg.postMessage('Item do not exist to be deleted.');
        else
          this.msg.postMessage('Other error.')
      }
      else
        this.msg.postMessage('Item successfully deleted.');

    })

  }

  onDelete(){
    console.log(this.delete_id);
    if(this.delete_id > 0){
      this.deleteOrder(this.delete_id);
    }    
  }

}
