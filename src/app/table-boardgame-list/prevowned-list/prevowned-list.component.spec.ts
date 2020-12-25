import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrevownedListComponent } from './prevowned-list.component';

describe('PrevownedListComponent', () => {
  let component: PrevownedListComponent;
  let fixture: ComponentFixture<PrevownedListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrevownedListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrevownedListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
