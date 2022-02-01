import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { notificationData } from '../shared/notification-data.model';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [
    trigger('notificationAnim', [

      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(5px)'
        }),
        animate('150ms ease-out')
      ]),

      transition(':leave', [
        animate('150ms ease-out', style({
          opacity: 0,
          transform: 'translateX(5px)'
        }))
      ])
    ])
  ]
})
export class NotificationComponent implements OnInit {

  notification: notificationData;

  timeout: any;

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.notificationService.notifications.subscribe((notification: notificationData) => {
      this.notification = notification;

      clearTimeout(this.timeout)

      this.timeout = setTimeout(() => {
        this.notification = null
      }, this.notification.duration);
    })
  }

}
