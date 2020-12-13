import { Component, Input, OnInit } from '@angular/core';
import { BggBoardgameThing } from 'src/app/bgg-objects';

@Component({
  selector: 'app-archive-table',
  templateUrl: './archive-table.component.html',
  styleUrls: ['./archive-table.component.scss']
})
export class ArchiveTableComponent implements OnInit {
  @Input() games: BggBoardgameThing[];

  constructor() { }

  ngOnInit(): void {
  }

}
