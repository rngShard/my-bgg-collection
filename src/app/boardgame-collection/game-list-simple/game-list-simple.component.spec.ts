import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameListSimple } from './game-list-simple.component';

describe('GameListSimple', () => {
  let component: GameListSimple;
  let fixture: ComponentFixture<GameListSimple>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameListSimple ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameListSimple);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
