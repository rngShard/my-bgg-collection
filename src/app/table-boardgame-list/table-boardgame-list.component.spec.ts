import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableBoardgameListComponent } from './table-boardgame-list.component';

describe('TableBoardgameListComponent', () => {
  let component: TableBoardgameListComponent;
  let fixture: ComponentFixture<TableBoardgameListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableBoardgameListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableBoardgameListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
