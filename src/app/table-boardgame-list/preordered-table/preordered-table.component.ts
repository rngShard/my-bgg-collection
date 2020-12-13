import { Component, Input, OnInit } from '@angular/core';
import { BggBoardgameThing } from 'src/app/bgg-objects';

@Component({
  selector: 'app-preordered-table',
  templateUrl: './preordered-table.component.html',
  styleUrls: ['./preordered-table.component.scss']
})
export class PreorderedTableComponent implements OnInit {
  @Input() games: BggBoardgameThing[];

  constructor() { }

  ngOnInit(): void {
  }

}
