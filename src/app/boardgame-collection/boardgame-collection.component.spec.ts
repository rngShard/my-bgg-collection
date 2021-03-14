import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardgameCollectionComponent } from './boardgame-collection.component';

describe('TableBoardgameListComponent', () => {
  let component: BoardgameCollectionComponent;
  let fixture: ComponentFixture<BoardgameCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardgameCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardgameCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
