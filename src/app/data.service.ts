import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface data{
  name:string;
  links:[]
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private messageSource = new BehaviorSubject({});
  currentMessage = this.messageSource.asObservable();

  constructor() { }

  changeMessage(message: data) {
    this.messageSource.next(message)
  }
}
