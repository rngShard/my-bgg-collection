import { Component, Input, OnInit } from '@angular/core';
import { BggBoardgame } from 'src/app/bgg-objects';

@Component({
  selector: 'app-preordered',
  templateUrl: './preordered.component.html',
  styleUrls: ['./preordered.component.scss']
})
export class PreorderedComponent implements OnInit {
  @Input() games: BggBoardgame[];

  constructor() {}

  ngOnInit(): void {
    // this.games.sort((a,b) => +b.yearPublished - +a.yearPublished);   // FIX: Implement sorting properly
  }

}
