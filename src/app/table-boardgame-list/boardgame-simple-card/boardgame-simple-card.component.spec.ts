import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardgameSimpleCardComponent } from './boardgame-simple-card.component';

describe('BoardgameSimpleCardComponent', () => {
  let component: BoardgameSimpleCardComponent;
  let fixture: ComponentFixture<BoardgameSimpleCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardgameSimpleCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardgameSimpleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
