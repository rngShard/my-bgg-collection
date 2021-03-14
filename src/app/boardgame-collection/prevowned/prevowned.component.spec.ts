import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevownedComponent } from './prevowned.component';

describe('PrevownedListComponent', () => {
  let component: PrevownedComponent;
  let fixture: ComponentFixture<PrevownedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrevownedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevownedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
