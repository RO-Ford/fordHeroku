import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MinimaleComponent } from './minimale.component';

describe('MinimaleComponent', () => {
  let component: MinimaleComponent;
  let fixture: ComponentFixture<MinimaleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MinimaleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MinimaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
