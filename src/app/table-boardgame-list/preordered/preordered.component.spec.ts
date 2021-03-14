import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreorderedComponent } from './preordered.component';

describe('PreorderedComponent', () => {
  let component: PreorderedComponent;
  let fixture: ComponentFixture<PreorderedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreorderedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreorderedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
