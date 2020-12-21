import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreorderedTableComponent } from './preordered-table.component';

describe('PreorderedTableComponent', () => {
  let component: PreorderedTableComponent;
  let fixture: ComponentFixture<PreorderedTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreorderedTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreorderedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
