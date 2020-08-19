import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrolemodalComponent } from './addrolemodal.component';

describe('AddrolemodalComponent', () => {
  let component: AddrolemodalComponent;
  let fixture: ComponentFixture<AddrolemodalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddrolemodalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrolemodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
