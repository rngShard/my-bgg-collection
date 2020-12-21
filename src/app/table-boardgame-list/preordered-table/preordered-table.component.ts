import { Component, Input, OnInit } from '@angular/core';
import { BggBoardgame } from 'src/app/bgg-objects';

@Component({
  selector: 'app-preordered-table',
  templateUrl: './preordered-table.component.html',
  styleUrls: ['./preordered-table.component.scss']
})
export class PreorderedTableComponent implements OnInit {
  @Input() games: BggBoardgame[];

  constructor() { }

  ngOnInit(): void {
    // this.games.sort((a,b) => +b.yearPublished - +a.yearPublished);   // FIX: Implement sorting properly
  }

}
