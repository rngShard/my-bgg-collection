import { Component, OnInit, Input } from '@angular/core';
import { BggBoardgame } from '../bgg-objects';
import { BggApiService } from '../bgg-api.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-boardgame-collection',
  templateUrl: './boardgame-collection.component.html',
  styleUrls: ['./boardgame-collection.component.scss']
})
export class BoardgameCollectionComponent implements OnInit {
  @Input() username: String;
  bggUserURL: String;
  AppSections = AppSections;
  toShow: AppSections = null;

  boardgames: BggBoardgame[] = [];
  prevowned: BggBoardgame[] = [];
  fortrade: BggBoardgame[] = [];
  own: BggBoardgame[] = [];
  preordered: BggBoardgame[] = [];

  constructor(
    private _bggApiService: BggApiService,
    public dialog: MatDialog
  ) {}
  
  ngOnInit() {
    this.bggUserURL = `https://boardgamegeek.com/user/${this.username}`;
    this._bggApiService.getBGGCollection().subscribe(response => {
      if (response.status === 202) {
        this.open202Dialog();
      } else if (response.status === 200) {
        const stringXmlData = response.body;
        this._bggApiService.parseBGGCollectionXML(stringXmlData).then((xmlData: BggBoardgame[]) => {
          this.boardgames = xmlData;
          console.log(`App retrieved ${this.boardgames.length} boardgames.`)
  
          this.sortBoardgamesByCollection();
          this.toShow = AppSections.Collection;
        })
      } else {
        console.error("ERROR: _bggApiService.getBGGCollection() returned HTTP != 200/202", response);
      }
    });
  }

  sortBoardgamesByCollection() {
    let c = 0;
    let prevowned = [], fortrade = [], preordered = [], own = [];
    for (let game of this.boardgames) {
      if (game.status.prevowned) { prevowned.push(game); }
      if (game.status.fortrade) { fortrade.push(game); }
      if (game.status.own) { own.push(game); }
      if (game.status.preordered) { preordered.push(game); }
      if (!game.status.prevowned && !game.status.fortrade && !game.status.own && !game.status.preordered) {
        console.log(`Found game without Collection-Array:`, game);
      }   // note: all ifs, no else-ifs (could be in multiple collections)

      c++;
      if (c === this.boardgames.length) {
        this.prevowned = prevowned;
        this.fortrade = fortrade;
        this.own = own;
        this.preordered = preordered;
        console.log(`Sorted ${this.boardgames.length} games by collection:\nPrevOwned (${this.prevowned.length}), ForTrade (${this.fortrade.length}), Own (${this.own.length}), Preordered (${this.preordered.length})`)
      }
    }
  }

  open202Dialog() {
    const dialogRef = this.dialog.open(Http202Dialog);

    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    });
  }
}

@Component({
  selector: 'http-202-dialog',
  templateUrl: 'http-202-dialog.html',
})
export class Http202Dialog {}

export enum AppSections {
  "Collection",
  "Archive",
  "Wishlist",
  "Preordered",
  "PrevOwned"
}
