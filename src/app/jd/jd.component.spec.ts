/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { JdComponent } from './jd.component';

describe('JdComponent', () => {
  let component: JdComponent;
  let fixture: ComponentFixture<JdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
