import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { MessageCallback } from './message_action';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  lastMessage = new Subject<string>();
  confirm = false;
  callback?: MessageCallback | null = null;

  constructor() { }

  postMessage(msg: String){
    this.confirm = false;
    this.callback = null;

    this.lastMessage.next(msg.toString());
  }

  postMessageWithConfirm(msg: String, callback: MessageCallback){
    this.confirm = true;
    this.callback = callback;

    this.lastMessage.next(msg.toString());
  }

  getMessage(): Observable<String>{
    return this.lastMessage;
  }

}
