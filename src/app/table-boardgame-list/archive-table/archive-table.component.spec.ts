import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveTableComponent } from './archive-table.component';

describe('ArchiveTableComponent', () => {
  let component: ArchiveTableComponent;
  let fixture: ComponentFixture<ArchiveTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchiveTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchiveTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
