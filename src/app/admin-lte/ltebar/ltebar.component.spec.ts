/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LteBarComponent } from './ltebar.component';

describe('LteBarComponent', () => {
  let component: LteBarComponent;
  let fixture: ComponentFixture<LteBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LteBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LteBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
