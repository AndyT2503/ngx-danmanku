import { animate, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subject, takeUntil } from 'rxjs';
import { StyleObjectLike } from './danmaku-types';

@Component({
  selector: 'ngx-danmaku',
  template: `
  <div class="iframe-container">
      <div class="danmaku-text" [ngStyle]="styleMessage">
          <ng-container *ngFor="let message of messageContent; let i = index">
              <div [@textSlider] class="message" *ngIf="i === currentMessageIndex">
                  {{message}}
              </div>
          </ng-container>
      </div>
      <iframe [ngStyle]="styles" [src]="src | trustResource" frameborder="0"
          scrolling="no" allowfullscreen></iframe>
  </div>
  `,
  styleUrls: ['./ngx-danmaku.component.scss'],
  animations: [
    trigger('textSlider', [
      transition(':enter', [
        style({ left: '-400px' }),
        animate('5000ms ease-in')
      ]),
      transition(':leave', [
        style({ right: '0px' }),
        animate('5000ms ease-in', style({ transform: 'translateX(100%)' }))
      ])
    ])
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NgxDanmakuComponent implements OnInit, OnDestroy {
  @Input() src!: string;
  @Input('messages') messages$!: Observable<string>;
  @Input() styles: StyleObjectLike = {
    'width': '100%',
    'height': '600px'
  };
  @Input() messagePosition!: 'top' | 'middle' | 'bottom';

  styleMessage!: StyleObjectLike;
  currentMessageIndex = 0;
  messageContent: string[] = [];
  private destroyed$ = new Subject<void>();
  constructor(
    private readonly cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.setStyleMessage();
    this.setupGetNewMessageContent();
  }

  private setStyleMessage(): void {
    if (this.messagePosition === 'top') {
      this.styleMessage = {
        'top': '12%'
      };
    }
    if (this.messagePosition === 'bottom') {
      this.styleMessage = {
        'bottom': '12%'
      };
    }
    if (this.messagePosition === 'middle') {
      this.styleMessage = {
        'bottom': '50%'
      };
    }
  }

  private setupGetNewMessageContent(): void {
    this.messages$.pipe(takeUntil(this.destroyed$)).subscribe(message => {
      this.messageContent = [...this.messageContent, message];
      this.cdr.markForCheck();
    });
    interval(600).pipe(takeUntil(this.destroyed$)).subscribe(
      () => {
        if (this.currentMessageIndex <= this.messageContent.length - 1) {
          this.currentMessageIndex++;
          this.cdr.markForCheck();
        }
      }
    );
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
