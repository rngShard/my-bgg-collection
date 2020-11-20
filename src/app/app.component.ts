import { Component, OnInit } from '@angular/core';
import { BggApiService } from './bgg-api.service';
import { BggBoardgame } from './bgg-objects';
import Config from '../../config.json';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  username: String;
  bggUserURL: String;
  boardgames: BggBoardgame[];
  
  constructor(private _bggApiService: BggApiService) {
    this.username = Config.bgg.username;
    this.bggUserURL = `https://boardgamegeek.com/user/${Config.bgg.username}`;
    this.boardgames = [];
  }

  ngOnInit() {
    this._bggApiService.getBGGCollection().subscribe(stringXmlData => {
      // console.log(stringXmlData);
      this._bggApiService.parseBGGCollectionXML(stringXmlData).then((xmlData: BggBoardgame[]) => {
        this.boardgames = xmlData;
      })
    });
  }
}
