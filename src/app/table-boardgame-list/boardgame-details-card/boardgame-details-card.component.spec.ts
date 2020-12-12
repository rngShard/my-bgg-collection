import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardgameDetailsCardComponent } from './boardgame-details-card.component';

describe('BoardgameDetailsCardComponent', () => {
  let component: BoardgameDetailsCardComponent;
  let fixture: ComponentFixture<BoardgameDetailsCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardgameDetailsCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardgameDetailsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
