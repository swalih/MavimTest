import { Component, OnInit } from '@angular/core';
import { PizzaService } from '../pizza.service';
import { MessageService } from '../message.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  data: any = null;

  sort_key: string|number = "";
  sort_asc = true;

  constructor(private service: PizzaService, private message: MessageService) { }

  ngOnInit(): void {
    this.updateData();
  }

  updateData(){
    this.service.getList()
    .subscribe(data => {
        this.data = data;
        for(let x in data)
          this.data[x]['id'] = parseInt(this.data[x]['id'])
        if(this.data.length <= 0)
          this.message.postMessage("Data failed to load due to network error.");
    });
  }

  refresh(){
    this.updateData();
  }

  sortBy(key: string|number){
    
    if(this.sort_key == key)
      this.sort_asc = !this.sort_asc;
    else{
      this.sort_key = key;
      this.sort_asc = true;
    }

    if(this.sort_asc){
      this.data.sort((a: any, b: any) => {
        if(a[key] < b[key]) return -1;
        if(a[key] > b[key]) return 1;
        return 0;
      });
    }
    else{
      this.data.sort((a: any, b: any) => {
        if(a[key] < b[key]) return 1;
        if(a[key] > b[key]) return -1;
        return 0;
      });
    }
  }

  deleteOrder(id: string){
    console.log(id);
    if(parseInt(id) > 0){
      this.message.postMessageWithConfirm("Confirm Delete?", () => {
        this.service.cancelOrder(parseInt(id))
          .subscribe(res => {
            if(res instanceof HttpErrorResponse){
              if(res.status == 404)
                this.message.postMessage('Item do not exist to be deleted.');
              else
                this.message.postMessage('Other error.')
            }
            else
              this.message.postMessage('Item successfully deleted.');
              
            this.refresh();
          });
      });
    }  
  }

}
