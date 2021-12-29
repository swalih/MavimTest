import { Component, OnInit } from '@angular/core';
import { PizzaService } from '../pizza.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  data: any = [];

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


}
