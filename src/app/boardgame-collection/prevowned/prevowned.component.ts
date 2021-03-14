import { Component, Input, OnInit } from '@angular/core';
import { BggBoardgame } from 'src/app/bgg-objects';

@Component({
  selector: 'app-prevowned',
  templateUrl: './prevowned.component.html',
  styleUrls: ['./prevowned.component.scss']
})
export class PrevownedComponent implements OnInit {
  @Input() games: BggBoardgame[];

  constructor() { }

  ngOnInit(): void {
  }

}
