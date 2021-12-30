import { Component, OnInit } from '@angular/core';
import { PizzaService } from '../pizza.service';
import { MessageService } from '../message.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Order, OrderForView } from './order';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  formData: OrderForView = {
    'Crust': "",
    'Flavor': "",
    'Size': "",
    'Order_ID': 0,
    'Table_No': "",
    'Timestamp': 0,
    'Timestamp_Date': new Date(),
    'Timestamp_Time': "",
    'id': 0
  }

  errorMsg: {[key: string]: {
    'msg': string, 'active': boolean
  }} = {
    'crust': {'msg': 'Must be a string', 'active': false},
    'flavor': {'msg': 'Must be a string', 'active': false},
    'size': {'msg': 'Must be a string', 'active': false},
    'order_id': {'msg': 'Expected an integer', 'active': false},
    'table_no': {'msg': 'Must be a string', 'active': false},
    'timestamp': {'msg': 'Timestamp must at least be from 10 minutes ago.', 'active': false},
    'id': {'msg': 'Expected an integer', 'active': false}
  };

  constructor(private service: PizzaService, 
          private msg: MessageService,
          private router: Router) { }

  ngOnInit(): void {
  }

  reset(){
    this.formData = {} as OrderForView;

    this.resetError();
  }

  resetError(){
    for(const x in this.errorMsg){
      if(this.errorMsg.hasOwnProperty(x))
        this.errorMsg[x].active = false;
    }
  }

  computeTimestamp(){
    let timestamp = new Date(this.formData.Timestamp_Date).getTime();
    let timeSplit = this.formData.Timestamp_Time.split(':').map(x => parseInt(x))
    timestamp += timeSplit[0] * 60 + timeSplit[1];
    return timestamp;
  }

  validate(){
    this.resetError();
    console.log(this.formData);

    if(this.formData.Crust.length <= 0)
      this.errorMsg.crust.active = true;

    if(this.formData.Flavor.length <= 0)
      this.errorMsg.flavor.active = true;

    if(this.formData.Size.length <= 0)
      this.errorMsg.size.active = true;

    if(this.formData.Table_No.length <= 0)
      this.errorMsg.table_no.active = true;

    this.formData.Timestamp = this.computeTimestamp(); 
    if(this.formData.Timestamp < ((new Date().getTime() / 1000) - (10 * 60))) //within last 10 minutes
      this.errorMsg.timestamp.active = true;

    if(this.formData.id <= 0)
      this.errorMsg.id.active = true;

    if(this.formData.Order_ID <= 0)
      this.errorMsg.order_id.active = true;

      for(const x in this.errorMsg){
          if(this.errorMsg[x].active)
            return false;
    }

      return true;
  }

  makeOrder(){
    if(!this.validate()){
      this.msg.postMessage("Data does not meet validation standards.");
      return;
    }
  
    let postData: any = {};
    Object.keys(this.formData).forEach(key  => {
      if(key == "Timestamp_Date" || key == "Timestamp_Time")
        return;

      postData[key] = this.formData[key as keyof OrderForView];
    });

    console.log(postData);

    this.service.postOrder(postData)
      .subscribe(res => {
        this.reset();
        if(res instanceof HttpErrorResponse){
          if(res.status == 404)
            this.msg.postMessage('Item already exists.');
          else
            this.msg.postMessage('Other error.')
        }
        else{
          this.msg.postMessage('Item successfully added.');
          this.router.navigate(['/', 'list']);
        }
      });
  }

  timestampTimeFieldInput(e: Event){
      this.formData.Timestamp_Time = (e.target as HTMLInputElement).value;    
  }

}
