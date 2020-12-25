import { Component, Input, OnInit } from '@angular/core';
import { BggBoardgame } from 'src/app/bgg-objects';

@Component({
  selector: 'app-prevowned-list',
  templateUrl: './prevowned-list.component.html',
  styleUrls: ['./prevowned-list.component.scss']
})
export class PrevownedListComponent implements OnInit {
  @Input() games: BggBoardgame[];

  constructor() { }

  ngOnInit(): void {
  }

}
