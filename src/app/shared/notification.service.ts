import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { notificationData } from './notification-data.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notification$: Subject<notificationData> = new Subject();


  //Classes outside can only subscribe to the subject and cant call next since its private
  get notifications() {
    return this.notification$.asObservable();
  }

  constructor() { }

  show(text: string, duration = 5000) {
    this.notification$.next({ text, duration });
  }

}
