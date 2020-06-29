/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TempHumiComponent } from './tempHumi.component';

describe('TempHumiComponent', () => {
  let component: TempHumiComponent;
  let fixture: ComponentFixture<TempHumiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempHumiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempHumiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
