import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableExpandedDetailsComponent } from './table-expanded-details.component';

describe('TableExpandedDetailsComponent', () => {
  let component: TableExpandedDetailsComponent;
  let fixture: ComponentFixture<TableExpandedDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableExpandedDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableExpandedDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
