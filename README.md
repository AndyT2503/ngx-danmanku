# Ngx-Danmaku

Ngx-Danmaku is the Angular library to display flying comments on iframes element.

## Installation

You can install it with npm:
> npm install ngx-danmaku

## Usage
app.module.ts
```
import { NgxDanmakuModule } from 'ngx-danmaku';
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgxDanmakuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```
app.component.ts
```
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
  export class AppComponent {
  src = 'some iframe source url';
  message$ = interval(200).pipe(map((x) => 'Hello' + x)); // Observable message
}
```


app.component.html
```
<ngx-danmaku [src]="src" messagePosition="top" [messages]="message$"></ngx-danmaku>
```
## API

| Property        | Description              | Type                          |
|-----------------|--------------------------|-------------------------------|
| src             | Iframe source url        | string                        |
| message         | Value of new message     | Observable<string\>            |
| styles          | ngStyle of iframe element  | object                        |
| messagePosition | Position of message      | "top" \| "middle" \| "bottom" |
