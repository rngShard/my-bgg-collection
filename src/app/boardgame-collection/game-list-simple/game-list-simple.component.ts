import { Component, Input, OnInit } from '@angular/core';
import { BggBoardgame } from 'src/app/bgg-objects';

@Component({
  selector: 'app-game-list-simple',
  templateUrl: './game-list-simple.component.html',
  styleUrls: ['./game-list-simple.component.scss']
})
export class GameListSimple implements OnInit {
  @Input() games: BggBoardgame[];

  constructor() {}

  ngOnInit(): void {
    // this.games.sort((a,b) => +b.yearPublished - +a.yearPublished);   // FIX: Implement sorting properly
  }
}
