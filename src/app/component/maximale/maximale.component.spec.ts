import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaximaleComponent } from './maximale.component';

describe('MaximaleComponent', () => {
  let component: MaximaleComponent;
  let fixture: ComponentFixture<MaximaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaximaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaximaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
