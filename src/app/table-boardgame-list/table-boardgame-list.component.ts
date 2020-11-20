import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BggBoardgame, BggBoardgameThing } from '../bgg-objects';
import { BggApiService } from '../bgg-api.service';

@Component({
  selector: 'app-table-boardgame-list',
  templateUrl: './table-boardgame-list.component.html',
  styleUrls: ['./table-boardgame-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableBoardgameListComponent implements OnInit, AfterViewInit {
  boardgames: BggBoardgame[] = [];
  fortrade: BggBoardgame[] = [];
  own: BggBoardgameThing[] = [];
  preordered: BggBoardgame[] = [];

  dataSource: MatTableDataSource<BggBoardgameThing>;
  columnsToDisplay = ['thumbnail', 'name', 'yearPublished', 'numPlayersRecommended', 'playingTime'];
  expandedRow: BggBoardgameThing | null;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
 
  constructor(private _bggApiService: BggApiService) {
    this.dataSource = new MatTableDataSource(this.own);
  }
  
  ngOnInit() {
    this._bggApiService.getBGGCollection().subscribe(stringXmlData => {
      this._bggApiService.parseBGGCollectionXML(stringXmlData).then((xmlData: BggBoardgame[]) => {
        this.boardgames = xmlData;
        console.log(`App retrieved ${this.boardgames.length} boardgames.`)

        this.sortBoardgamesByCollection();
      })
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // applyFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.dataSource.filter = filterValue.trim().toLowerCase();

  //   if (this.dataSource.paginator) {
  //     this.dataSource.paginator.firstPage();
  //   }
  // }

  sortBoardgamesByCollection() {
    for (let game of this.boardgames) {
      if (game.status.fortrade) {
        this.fortrade.push(game);
      }
      if (game.status.own) {
        this._bggApiService.getBGGBoardgame(game.objectid).then((gameThing: BggBoardgameThing) => {
          this.own.push(gameThing);
          this.dataSource.data = this.own;
        });
      }
      if (game.status.preordered) {
        this.preordered.push(game);
      }
      if (!game.status.fortrade && !game.status.own && !game.status.preordered) {
        console.log(`Found game without Collection-Array:`, game);
      }
    }
    console.log(`Sorted ${this.boardgames.length} games by collection:\nForTrade (${this.fortrade.length}), Own (follow-up API calls), Preordered (${this.preordered.length})`)
  }
}
