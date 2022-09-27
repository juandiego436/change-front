/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DashbardComponent } from './Dashbard.component';

describe('DashbardComponent', () => {
  let component: DashbardComponent;
  let fixture: ComponentFixture<DashbardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashbardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashbardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
