import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  lastMessage = new Subject<string>();

  constructor() { }

  postMessage(msg: String){
    this.lastMessage.next(msg.toString());
  }

  getMessage(): Observable<String>{
    return this.lastMessage;
  }

}
