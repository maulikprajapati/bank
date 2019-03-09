import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WithdrowComponent } from './withdrow.component';

describe('WithdrowComponent', () => {
  let component: WithdrowComponent;
  let fixture: ComponentFixture<WithdrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WithdrowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WithdrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
