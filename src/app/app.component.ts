import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, Optional } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnim', [
      transition(':increment', [

        style({
          position: 'relative',
          overflow: 'Hidden'
        }),

        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          })
        ], {optional: true}),

        group([
          query(':leave', [
            animate('200ms ease-out',style({
              opacity: 0,
              transform: 'translateX(-80px)',
            }))
          ],{optional: true}),
  
          query(':enter', [
            style({
              transform: 'translateX(80px)',
              opacity: 0,
            }),    
            animate('200ms ease-in', style({
              opacity: 1,
              transform: 'translateX(0)',
            }))
          ], {optional: true})
        ])

      ]),
      transition(':decrement', [

        style({
          position: 'relative',
          overflow: 'Hidden'
        }),

        query(':enter, :leave', [
          style({
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          })
        ], {optional: true}),

        group([
          query(':leave', [
            animate('200ms ease-out',style({
              opacity: 0,
              transform: 'translateX(80px)',
            }))
          ],{optional: true}),
  
          query(':enter', [
            style({
              transform: 'translateX(-80px)',
              opacity: 0,
            }),    
            animate('200ms ease-in', style({
              opacity: 1,
              transform: 'translateX(0)',
            }))
          ], {optional: true})
        ])

      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  
  dateTime: Observable<Date>;

  ngOnInit(): void {
    this.dateTime = timer(0, 1000).pipe(map(() => {return new Date()}))
  }
  
  prepareRoute(outlet: RouterOutlet) {
    if (outlet.isActivated) return outlet.activatedRouteData['tab'];
    else return
  }
}
