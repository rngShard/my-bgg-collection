import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardgameDetailsDialogComponent } from './boardgame-details-dialog.component';

describe('BoardgameDetailsCardComponent', () => {
  let component: BoardgameDetailsDialogComponent;
  let fixture: ComponentFixture<BoardgameDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardgameDetailsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardgameDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
