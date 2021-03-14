import { Component, Input, OnInit } from '@angular/core';
import { BggBoardgameThing } from 'src/app/bgg-objects';
import { Url } from 'url';

@Component({
  selector: 'app-boardgame-details-card',
  templateUrl: './boardgame-details-card.component.html',
  styleUrls: ['./boardgame-details-card.component.scss']
})
export class BoardgameDetailsCardComponent implements OnInit {
  @Input() game: BggBoardgameThing | null;
  gameUrl: String;

  constructor() {}

  ngOnInit(): void {
    this.gameUrl = `https://boardgamegeek.com/boardgame/${this.game.objectid}`
  }

}
