import { Component, Input, OnInit } from '@angular/core';
import { BggBoardgameThing } from 'src/app/bgg-objects';
import { Url } from 'url';

@Component({
  selector: 'app-table-expanded-details',
  templateUrl: './table-expanded-details.component.html',
  styleUrls: ['./table-expanded-details.component.scss']
})
export class TableExpandedDetailsComponent implements OnInit {
  @Input() game: BggBoardgameThing | null;
  gameUrl: String;

  constructor() {}

  ngOnInit(): void {
    this.gameUrl = `https://boardgamegeek.com/boardgame/${this.game.objectid}`
  }

}
