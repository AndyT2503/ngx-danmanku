import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxDanmakuComponent } from './ngx-danmaku.component';
import { TrustResourcePipe } from './trust-resource.pipe';



@NgModule({
  declarations: [
    NgxDanmakuComponent,
    TrustResourcePipe
  ],
  imports: [
    CommonModule,
    BrowserAnimationsModule
  ],
  exports: [
    NgxDanmakuComponent
  ]
})
export class NgxDanmakuModule { }
