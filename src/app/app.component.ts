import { Component, OnInit } from '@angular/core';
import { BggApiService } from './bgg-api.service';
import { BggBoardgame } from './bgg-objects';
import Config from '../../config.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  username: String;
  boardgames: BggBoardgame[];
  
  constructor(private _bggApiService: BggApiService) {
    this.username = Config.bgg.username;
  }
}
