import { Component, OnInit } from '@angular/core';
import { PizzaService } from '../pizza.service';
import { MessageService } from '../message.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  formData = {
    'Crust': "",
    'Flavor': "",
    'Size': "",
    'Order_ID': 0,
    'Table_No': "",
    'Timestamp': 0,
    'id': 0
  }

  constructor(private service: PizzaService, 
          private msg: MessageService) { }

  ngOnInit(): void {
  }

  reset(){
    this.formData = {
      'Crust': "",
      'Flavor': "",
      'Size': "",
      'Order_ID': 0,
      'Table_No': "",
      'Timestamp': 0,
      'id': 0
    };
  }

  validate(){
    console.log(this.formData);
    if(this.formData.Crust.length > 0 &&
      this.formData.Flavor.length > 0 &&
      this.formData.Size.length > 0 &&
      this.formData.Table_No.length > 0 &&
      this.formData.Timestamp >= ((new Date().getTime() / 1000) - (10 * 60)) && //within last 10 minutes
      this.formData.id > 0 &&
      this.formData.Order_ID > 0){
        return true;
      }

      return false;
  }

  makeOrder(){
    if(!this.validate()){
      this.msg.postMessage("Data does not meet validation standards.");
      return;
    }
    
    this.service.postOrder(this.formData)
      .subscribe(res => {
        if(res instanceof HttpErrorResponse){
          if(res.status == 404)
            this.msg.postMessage('Item already exists.');
          else
            this.msg.postMessage('Other error.')
        }
        else
          this.msg.postMessage('Item successfully added.');
      });
  }

}
