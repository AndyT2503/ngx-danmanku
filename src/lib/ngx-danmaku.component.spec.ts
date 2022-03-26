import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxDanmakuComponent } from './ngx-danmaku.component';

describe('NgxDanmakuComponent', () => {
  let component: NgxDanmakuComponent;
  let fixture: ComponentFixture<NgxDanmakuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxDanmakuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxDanmakuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
